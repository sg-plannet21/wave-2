import entityLookup from '@/lib/entity-lookup';
import useRegions from './useRegions';
import { Region } from '../types';

function useRegionsLookup() {
  const { data } = useRegions();

  return data && entityLookup<Region>(data, 'id');
}

export default useRegionsLookup;
