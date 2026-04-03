import { DJ } from '@/types/dj';
import { EventRequest } from '@/types/event';
import { MatchResult } from '@/types/match';

export function calculateMatch(dj: DJ, criteria: EventRequest): MatchResult {
  let score = 0;
  let explanationParts: string[] = [];

  // NEW DJs: Mix Score 50%, Genre match 40%, Price fit 10%
  // VERIFIED/ELITE/READY: Crowd Score 50%, Genre match 30%, Reliability 20%

  if (dj.level === 'NEW') {
    // Mix Score: 50%
    const mixComponent = dj.mixScore * 0.5;
    score += mixComponent;
    explanationParts.push(`Mix quality: ${dj.mixScore}/100`);

    // Genre match: 40%
    const genreMatch = calculateGenreMatch(dj.genres, criteria.vibes);
    const genreComponent = genreMatch * 0.4;
    score += genreComponent;
    explanationParts.push(`Genre match: ${genreMatch.toFixed(0)}%`);

    // Price fit: 10%
    const priceScore = calculatePriceScore(
      dj.pricePerHour,
      criteria.budgetMin,
      criteria.budgetMax
    );
    const priceComponent = priceScore * 0.1;
    score += priceComponent;
    explanationParts.push(`Price fit: ${priceScore.toFixed(0)}%`);
  } else {
    // VERIFIED, ELITE, READY DJs
    // Crowd Score: 50%
    const crowdComponent = dj.crowdScore * 0.5;
    score += crowdComponent;
    explanationParts.push(`Crowd energy: ${dj.crowdScore}/100`);

    // Genre match: 30%
    const genreMatch = calculateGenreMatch(dj.genres, criteria.vibes);
    const genreComponent = genreMatch * 0.3;
    score += genreComponent;
    explanationParts.push(`Genre match: ${genreMatch.toFixed(0)}%`);

    // Reliability: 20%
    const reliabilityComponent = dj.reliabilityScore * 0.2;
    score += reliabilityComponent;
    explanationParts.push(`Reliability: ${dj.reliabilityScore}/100`);
  }

  // Location bonus: +5 points if same location
  if (dj.location === criteria.location) {
    score += 5;
    explanationParts.push('Local to your area');
  }

  // Cap score at 100
  score = Math.min(score, 100);

  return {
    dj,
    score,
    matchPercentage: Math.round(score),
    explanation: explanationParts.join(' • '),
  };
}

function calculateGenreMatch(djGenres: string[], requestedVibes: string[]): number {
  if (requestedVibes.length === 0) return 50; // Default if no vibes specified

  // Count matches between DJ genres and requested vibes
  const matches = djGenres.filter((genre) =>
    requestedVibes.some((vibe) => {
      // Normalize for comparison
      const normalizedGenre = genre.toLowerCase().replace(/[\s-]/g, '');
      const normalizedVibe = vibe.toLowerCase().replace(/[\s-]/g, '');
      return (
        normalizedGenre.includes(normalizedVibe) ||
        normalizedVibe.includes(normalizedGenre)
      );
    })
  ).length;

  // Calculate percentage: (matches / requested vibes) * 100
  const matchPercentage = (matches / requestedVibes.length) * 100;

  // Also consider if DJ has any of the requested genres
  const hasAnyMatch = djGenres.some((genre) =>
    requestedVibes.some((vibe) => {
      const normalizedGenre = genre.toLowerCase();
      const normalizedVibe = vibe.toLowerCase();
      return normalizedGenre.includes(normalizedVibe) || normalizedVibe.includes(normalizedGenre);
    })
  );

  // Return at least 20% if there's any match, otherwise scale the percentage
  return hasAnyMatch ? Math.max(matchPercentage, 20) : 0;
}

function calculatePriceScore(
  djPrice: number,
  budgetMin: number,
  budgetMax: number
): number {
  // Perfect score if within budget
  if (djPrice >= budgetMin && djPrice <= budgetMax) {
    return 100;
  }

  // Penalize if out of budget
  if (djPrice < budgetMin) {
    // Below budget - might be suspicious
    const difference = budgetMin - djPrice;
    const penalty = (difference / budgetMin) * 100;
    return Math.max(100 - penalty, 50); // Min 50% score
  }

  if (djPrice > budgetMax) {
    // Above budget - reduce score based on how much over
    const difference = djPrice - budgetMax;
    const penalty = (difference / budgetMax) * 100;
    return Math.max(100 - penalty, 0); // Min 0% score
  }

  return 50; // Fallback
}

export function matchDJs(djs: DJ[], criteria: EventRequest): MatchResult[] {
  // Calculate match for all DJs
  const matches = djs.map((dj) => calculateMatch(dj, criteria));

  // Sort by score (highest first)
  matches.sort((a, b) => b.score - a.score);

  // Return top 5
  return matches.slice(0, 5);
}
