import Link from 'next/link';
import { MatchResult } from '@/types/match';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Sparkles } from 'lucide-react';
import { WhatsAppButton } from './whatsapp-button';

interface MatchCardProps {
  match: MatchResult;
  rank: number;
}

export function MatchCard({ match, rank }: MatchCardProps) {
  const { dj, matchPercentage, explanation } = match;

  const levelColors: Record<typeof dj.level, string> = {
    NEW: 'bg-blue-100 text-blue-800 border-blue-300',
    READY: 'bg-green-100 text-green-800 border-green-300',
    VERIFIED: 'bg-purple-100 text-purple-800 border-purple-300',
    ELITE: 'bg-amber-100 text-amber-800 border-amber-300',
  };

  return (
    <Card className="relative">
      <div className="absolute -left-3 -top-3 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
        #{rank}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-2xl">{dj.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>{dj.location}</span>
            </div>
          </div>
          <Badge className={levelColors[dj.level]}>{dj.level}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Sparkles className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-bold text-lg text-green-700">
              {matchPercentage}% Match
            </p>
            <p className="text-sm text-green-600">{explanation}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {dj.genres.map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {dj.vibeTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{dj.bio}</p>

        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{dj.pricePerHour} AED/hr</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={`/dj/${dj.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Full Profile
            </Button>
          </Link>
          <WhatsAppButton djName={dj.name} djWhatsApp={dj.whatsappNumber} />
        </div>
      </CardContent>
    </Card>
  );
}
