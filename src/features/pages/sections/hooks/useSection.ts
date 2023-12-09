import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Section } from '../types';

function useSection(id: string) {
  return useQuery({
    queryKey: ['section', id],
    queryFn: () => new ApiClient<Section>('/section').get(id),
    enabled: !!id,
  });
}

export default useSection;
