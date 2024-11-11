export const LAUNCH_PROTOCOL = 'viora://';

export const ENDPOINTS = {
  SONGS: '/songs',
  FEED: '/projects/feed',
  VOTES: '/votes',
  BADGES: '/badges',
  SONG_BADGES: '/song-badges',
  SONG_FETCH: '/song/fetch',
  PROFILES: '/profiles',
  ME: '/profiles/me',
  PROJECTS: '/projects',
  CONTRIBUTION_TIERS: '/contribution-tiers',
  CONTRIBUTIONS: '/contributions',
  EXCLUSIVE_CONTENT: '/exclusive-contents',
  FILES: '/upload/files',
};


const IMAGE_PROTOCOL = process.env.NEXT_PUBLIC_IMAGE_PROTOCOL;
const IMAGE_HOSTNAME = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME;
const IMAGE_PORT = process.env.NEXT_PUBLIC_IMAGE_PORT;

export const apiBaseUrl = `${IMAGE_PROTOCOL}://${IMAGE_HOSTNAME}${IMAGE_PORT ? ':' + IMAGE_PORT : ''}/api`
export const proxyBaseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/proxy`;
