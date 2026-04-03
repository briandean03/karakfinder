export type EventType = 'Villa Party' | 'Yacht Event' | 'Wedding' | 'Brand Event' | 'Club Night' | 'Corporate Event';

export type DubaiLocation =
  | 'Dubai Marina'
  | 'Downtown Dubai'
  | 'Jumeirah'
  | 'Palm Jumeirah'
  | 'JBR'
  | 'Business Bay'
  | 'Al Barsha'
  | 'City Walk'
  | 'DIFC'
  | 'Dubai Hills';

export interface EventRequest {
  location: DubaiLocation;
  eventType: EventType;
  vibes: string[]; // Genre/vibe preferences
  budgetMin: number;
  budgetMax: number;
  duration: number; // hours
}
