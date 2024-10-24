export interface KeyValue {
  [key: string]: any;
}

interface LockedBalance {
  amount: string;
  height: number;
}

export interface Balance {
  tokenID: string;
  availableBalance: string;
  lockedBalances: LockedBalance[];
}

export interface Auth {
  nonce: bigint;
  optionalKeys: Buffer[];
  mandatoryKeys: Buffer[];
}

export interface SongAttributes {
  apple_music_url?: string;
  spotify_url?: string;
  name: string;
  album: string;
  artists: string;
  cover_photo_url: string;
}

export interface Anchor {
  id: number;
  attributes: {
    apple_music_url?: string;
    spotify_url?: string;
    name: string;
    album: string;
    artists: string;
    cover_photo_url: string;
    anchorID: string;
    createdAt: string;
    rank?: number;
    hasVoted: boolean;
  };
}

export enum Badges {
  AOTN = 'Song of the minute',
  AOTD = 'Badge of the day',
  AOTW = 'Badge of the week',
  AOTM = 'Badge of the month',
}

export const BADGE_TITLES = {
  [Badges.AOTN]: 'Song Of The Minute',
  [Badges.AOTD]: 'Song Of The Day',
  [Badges.AOTW]: 'Song Of The Week',
  [Badges.AOTM]: 'Song Of The Month',
};
// types.ts (or the appropriate file for your types)
export interface Badge {
  id: string;
  attributes: {
    claimed: boolean;
    createdAt: string;
    nft_id: string;
    publishedAt: string;
    reward: string;
    updatedAt: string;
  };
}
export interface BadgeStat {
  type: Badges;
  count: number;
}

export interface BadgeStat {
  type: Badges;
  count: number;
}

export interface Badge {
  id: string;
  nft_id: string;
  createdAt: string;
  reward: string;
  claimed: boolean;
}
export enum FetchStatus {
  idle = 'idle',
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export interface Feedback {
  status: FetchStatus;
  message: string;
}

export enum MODULES {
  ANCHOR = 'anchor',
  BADGE = 'badge',
}

export enum COMMANDS {
  CREATE = 'create',
  VOTE = 'vote',
}

export type Timeout = NodeJS.Timeout;

export interface QuickAction {
  type: string;
  title: string;
  icon: string;
  userInfo: {
    url: string;
  };
}
