export type Level = 'NEW' | 'READY' | 'VERIFIED' | 'ELITE';

export type Genre =
  | 'House'
  | 'Techno'
  | 'Hip-Hop'
  | 'R&B'
  | 'Afrobeats'
  | 'Arabic'
  | 'EDM'
  | 'Deep House'
  | 'Tech House'
  | 'Afrohouse'
  | 'Commercial'
  | 'Mashup';

export type VibeTag =
  | 'High Energy'
  | 'Chill'
  | 'Underground'
  | 'Mainstream'
  | 'Cultural Fusion'
  | 'Sophisticated'
  | 'Party Starter'
  | 'Wedding Ready'
  | 'Brand Friendly';

export interface DJ {
  id: string;
  name: string;
  location: string; // Dubai area
  genres: Genre[];
  vibeTags: VibeTag[];
  level: Level;
  pricePerHour: number;
  bio: string;

  // Media
  mixUrls: string[]; // Paths to audio files in /public/audio
  crowdClipUrls: string[]; // Paths to video files in /public/video

  // Scores (0-100)
  mixScore: number;
  crowdScore: number;
  reliabilityScore: number;

  // Contact
  whatsappNumber: string;
}
