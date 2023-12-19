import { get } from 'lodash';

function versionEntityLookup<T, K extends keyof T>(
  entityLookup: T,
  lookupId: K | null,
  path: keyof T[K]
): string  {
  if (!lookupId) return '';

  return get(entityLookup[lookupId], path) || '[Deleted Object]';
}

export default versionEntityLookup;
