import { DubaiLocation, EventType } from '@/types/event';
import { Genre, VibeTag } from '@/types/dj';

export const DUBAI_LOCATIONS: DubaiLocation[] = [
  'Dubai Marina',
  'Downtown Dubai',
  'Jumeirah',
  'Palm Jumeirah',
  'JBR',
  'Business Bay',
  'Al Barsha',
  'City Walk',
  'DIFC',
  'Dubai Hills',
];

export const EVENT_TYPES: EventType[] = [
  'Villa Party',
  'Yacht Event',
  'Wedding',
  'Brand Event',
  'Club Night',
  'Corporate Event',
];

export const GENRES: Genre[] = [
  'House',
  'Techno',
  'Hip-Hop',
  'R&B',
  'Afrobeats',
  'Arabic',
  'EDM',
  'Deep House',
  'Tech House',
  'Afrohouse',
  'Commercial',
  'Mashup',
];

export const VIBE_TAGS: VibeTag[] = [
  'High Energy',
  'Chill',
  'Underground',
  'Mainstream',
  'Cultural Fusion',
  'Sophisticated',
  'Party Starter',
  'Wedding Ready',
  'Brand Friendly',
];

export const PRICE_RANGES = [
  { label: 'Budget (300-500 AED/hr)', min: 300, max: 500 },
  { label: 'Standard (500-800 AED/hr)', min: 500, max: 800 },
  { label: 'Premium (800-1200 AED/hr)', min: 800, max: 1200 },
  { label: 'Elite (1200+ AED/hr)', min: 1200, max: 5000 },
];

export const DURATION_OPTIONS = [
  { label: '2 hours', value: 2 },
  { label: '3 hours', value: 3 },
  { label: '4 hours', value: 4 },
  { label: '5 hours', value: 5 },
  { label: '6 hours', value: 6 },
  { label: '8+ hours', value: 8 },
];
