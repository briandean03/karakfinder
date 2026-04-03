'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';

interface CrowdClipPlayerProps {
  clipUrls: string[];
  djName: string;
}

export function CrowdClipPlayer({ clipUrls, djName }: CrowdClipPlayerProps) {
  if (clipUrls.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Crowd Clips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No crowd clips available yet. This DJ needs to complete their first
            booking to upload crowd proof!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Crowd Clips ({clipUrls.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {clipUrls.map((url, index) => (
          <div key={url} className="space-y-2">
            <p className="text-sm font-medium">
              {djName} - Crowd Clip {index + 1}
            </p>
            <video
              controls
              className="w-full rounded-lg"
              preload="metadata"
              style={{ maxHeight: '400px' }}
            >
              <source src={url} type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <p className="text-xs text-muted-foreground">
              Note: Demo video file (placeholder)
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
