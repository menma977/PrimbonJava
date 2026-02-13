// Core Types
export type Gender = 'M' | 'F';
export type RecordType = 'WETON' | 'MATCH' | 'CIRCUMCISION' | 'AI_CHAT';

export interface WetonData {
  pasaran: string; // e.g. "Pon"
  dina: string;    // e.g. "Senin"
  neptu: number;   // e.g. 11
}

export interface MatchResultData {
  score: number;
  title: string;
  meaning: string;
}

// Entity: User
export interface UserProfile {
  id: string; // UUID v4
  name: string;
  dob: string; // ISO Date "YYYY-MM-DD"
  gender: Gender;
  weton?: WetonData;
  createdAt: number; // Timestamp
}

// Inputs & Results
export type WetonInput = { date: string };
// WetonResult is just WetonData

export type MatchInput = { dateA: string; dateB: string };
export type MatchResult = {
  wetonA: WetonData;
  wetonB: WetonData;
  match: MatchResultData;
};

// Base History Record
interface BaseHistoryRecord {
  id: string;
  userId: string;
  aiAnalysis?: string;
  createdAt: number;
}

// Discriminated Unions
export interface WetonHistoryRecord extends BaseHistoryRecord {
  type: 'WETON';
  input: WetonInput;
  result: WetonData;
}

export interface MatchHistoryRecord extends BaseHistoryRecord {
  type: 'MATCH';
  input: MatchInput;
  result: MatchResult;
}

// Fallback for unimplemented types (still strictly typed, just not specific)
export interface OtherHistoryRecord extends BaseHistoryRecord {
  type: 'CIRCUMCISION' | 'AI_CHAT';
  input: unknown;
  result: unknown;
}

export type HistoryRecord = WetonHistoryRecord | MatchHistoryRecord | OtherHistoryRecord;

// Storage Key Constants
export const STORAGE_KEYS = {
  USERS: 'primbon_users_v1',
  HISTORY: 'primbon_history_v1',
  SETTINGS: 'primbon_settings_v1',
};
