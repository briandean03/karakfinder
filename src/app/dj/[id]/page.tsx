import { notFound } from 'next/navigation';
import { getDJById } from '@/lib/data-access';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, DollarSign, Music, Video } from 'lucide-react';
import { MixPlayer } from '@/components/features/mix-player';
import { CrowdClipPlayer } from '@/components/features/crowd-clip-player';
import { WhatsAppButton } from '@/components/features/whatsapp-button';

interface DJProfilePageProps {
  params: {
    id: string;
  };
}

export default async function DJProfilePage({ params }: DJProfilePageProps) {
  const dj = await getDJById(params.id);

  if (!dj) {
    notFound();
  }

  const levelColors: Record<typeof dj.level, string> = {
    NEW: 'bg-blue-100 text-blue-800 border-blue-300',
    READY: 'bg-green-100 text-green-800 border-green-300',
    VERIFIED: 'bg-purple-100 text-purple-800 border-purple-300',
    ELITE: 'bg-amber-100 text-amber-800 border-amber-300',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{dj.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{dj.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">{dj.pricePerHour} AED/hr</span>
              </div>
            </div>
          </div>
          <Badge className={`${levelColors[dj.level]} text-lg px-4 py-2`}>
            {dj.level}
          </Badge>
        </div>

        <p className="text-lg text-muted-foreground max-w-3xl">{dj.bio}</p>
      </div>

      {/* Genres & Vibes */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Genres
          </h3>
          <div className="flex flex-wrap gap-2">
            {dj.genres.map((genre) => (
              <Badge key={genre} variant="outline">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Vibe Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {dj.vibeTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Scores Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {dj.level === 'NEW' ? (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Music className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Mix Score</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">{dj.mixScore}/100</p>
              <p className="text-sm text-muted-foreground mt-1">
                Quality of uploaded mixes
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold">Crowd Score</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">{dj.crowdScore}/100</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Verified crowd energy
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Music className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Mix Score</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">{dj.mixScore}/100</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Quality of uploaded mixes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <h3 className="font-semibold">Reliability</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {dj.reliabilityScore}/100
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Booking consistency
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Separator className="my-8" />

      {/* Media Section */}
      <div className="space-y-8 mb-8">
        <MixPlayer mixUrls={dj.mixUrls} djName={dj.name} />
        <CrowdClipPlayer clipUrls={dj.crowdClipUrls} djName={dj.name} />
      </div>

      {/* Booking CTA */}
      <div className="bg-slate-50 border rounded-lg p-6 md:p-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to Book {dj.name}?</h2>
          <p className="text-muted-foreground">
            Send a WhatsApp message with your event details to get started.
          </p>
          <div className="flex justify-center">
            <WhatsAppButton djName={dj.name} djWhatsApp={dj.whatsappNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}
