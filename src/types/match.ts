import { DJ } from './dj';

export interface MatchResult {
  dj: DJ;
  score: number; // 0-100
  matchPercentage: number; // 0-100
  explanation: string;
}
