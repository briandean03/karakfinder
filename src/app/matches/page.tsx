'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MatchResult } from '@/types/match';
import { EventRequest } from '@/types/event';
import { MatchCard } from '@/components/features/match-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function MatchesPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [eventDetails, setEventDetails] = useState<EventRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load matches from sessionStorage
    const storedMatches = sessionStorage.getItem('matchResults');
    const storedEvent = sessionStorage.getItem('eventDetails');

    if (storedMatches && storedEvent) {
      setMatches(JSON.parse(storedMatches));
      setEventDetails(JSON.parse(storedEvent));
    } else {
      // No matches found, redirect to request form
      router.push('/request-event');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold">No Matches Found</h1>
          <p className="text-muted-foreground">
            We couldn't find any DJs matching your criteria. Try adjusting your preferences.
          </p>
          <Link href="/request-event">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Request Form
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/request-event">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Request Form
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-green-600" />
          <h1 className="text-4xl font-bold">Your Top DJ Matches</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Based on your event preferences, here are the best DJs for you:
        </p>
      </div>

      {/* Event Details Summary */}
      {eventDetails && (
        <div className="bg-slate-50 border rounded-lg p-6 mb-8">
          <h2 className="font-semibold mb-3">Your Event Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{eventDetails.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Event Type</p>
              <p className="font-medium">{eventDetails.eventType}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Budget</p>
              <p className="font-medium">
                {eventDetails.budgetMin}-{eventDetails.budgetMax} AED/hr
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{eventDetails.duration} hours</p>
            </div>
          </div>
          {eventDetails.vibes && eventDetails.vibes.length > 0 && (
            <div className="mt-3">
              <p className="text-muted-foreground text-sm">Genres</p>
              <p className="font-medium">{eventDetails.vibes.join(', ')}</p>
            </div>
          )}
        </div>
      )}

      {/* Match Results */}
      <div className="space-y-6">
        {matches.map((match, index) => (
          <MatchCard key={match.dj.id} match={match} rank={index + 1} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center bg-slate-50 border rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Not Finding What You Need?</h2>
        <p className="text-muted-foreground mb-6">
          Try adjusting your preferences or browse all DJs manually.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/request-event">
            <Button variant="outline">Refine Search</Button>
          </Link>
          <Link href="/djs">
            <Button>Browse All DJs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
