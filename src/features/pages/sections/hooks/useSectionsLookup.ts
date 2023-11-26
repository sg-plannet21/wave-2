import entityLookup from '@/lib/entity-lookup';
import useSections from './useSections';
import { Section } from '../types';

function useSectionsLookup() {
  const { data } = useSections();

  return data && entityLookup<Section>(data, 'section_id');
}

export default useSectionsLookup;
