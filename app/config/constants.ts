export const SPOTIFY_LINK_REG = /^https:\/\/open\.spotify\.com\/track\/[\w-]+/;

export const MUSIC_PLATFORMS = {
  APPLE: 'apple',
  SPOTIFY: 'spotify',
};
export const SPOTIFY_BASE = 'https://open.spotify.com/track/';

export const API_CALL_LIMIT = 10;

export const HTTP_STATUS = {
  OK: {CODE: 200, MESSAGE: 'OK'},
  CREATED: {CODE: 201, MESSAGE: 'Created'},
  NO_CONTENT: {CODE: 204, MESSAGE: 'No Content'},
  BAD_REQUEST: {CODE: 400, MESSAGE: 'Bad Request'},
  UNAUTHORIZED: {CODE: 401, MESSAGE: 'Unauthorized'},
  FORBIDDEN: {CODE: 403, MESSAGE: 'Forbidden'},
  NOT_FOUND: {CODE: 404, MESSAGE: 'Not Found'},
  NOT_SIGNED: {CODE: 405, MESSAGE: 'Not Signed'},
  INTERNAL_ERROR: {CODE: 500, MESSAGE: 'Internal Error'},
  PENDING: {CODE: 600, MESSAGE: 'Pending'},
};

export const USER_CREDENTIALS = 'user_session';
export const USER_PRESETS = 'user_presets';
