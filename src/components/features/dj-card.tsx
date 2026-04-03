import Link from 'next/link';
import { DJ } from '@/types/dj';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Music } from 'lucide-react';

interface DJCardProps {
  dj: DJ;
}

export function DJCard({ dj }: DJCardProps) {
  const levelColors: Record<DJ['level'], string> = {
    NEW: 'bg-blue-100 text-blue-800 border-blue-300',
    READY: 'bg-green-100 text-green-800 border-green-300',
    VERIFIED: 'bg-purple-100 text-purple-800 border-purple-300',
    ELITE: 'bg-amber-100 text-amber-800 border-amber-300',
  };

  return (
    <Link href={`/dj/${dj.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-xl">{dj.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{dj.location}</span>
              </div>
            </div>
            <Badge className={levelColors[dj.level]}>{dj.level}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {dj.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{dj.pricePerHour} AED/hr</span>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            {dj.level === 'NEW' ? (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Mix Score:</span>
                <span className="font-medium">{dj.mixScore}/100</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Crowd Score:</span>
                  <span className="font-medium">{dj.crowdScore}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reliability:</span>
                  <span className="font-medium">{dj.reliabilityScore}/100</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Music className="h-3 w-3" />
            <span>{dj.mixUrls.length} mixes available</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
