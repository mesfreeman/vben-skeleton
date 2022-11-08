import { isDevMode } from '/@/utils/env';

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes encryption key
export const cacheCipher = {
  key: '_13456973134311@',
  iv: '@11983194701111_',
};

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();
