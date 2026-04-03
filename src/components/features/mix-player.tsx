'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';

interface MixPlayerProps {
  mixUrls: string[];
  djName: string;
}

export function MixPlayer({ mixUrls, djName }: MixPlayerProps) {
  if (mixUrls.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Mix Uploads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No mixes uploaded yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5" />
          Mix Uploads ({mixUrls.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mixUrls.map((url, index) => (
          <div key={url} className="space-y-2">
            <p className="text-sm font-medium">
              {djName} - Mix {index + 1}
            </p>
            <audio
              controls
              className="w-full"
              preload="metadata"
              style={{ height: '40px' }}
            >
              <source src={url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p className="text-xs text-muted-foreground">
              Note: Demo audio file (placeholder)
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
