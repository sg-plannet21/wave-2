import axiosInstance from '@/lib/axios-instance';
import { useQuery } from 'react-query';
import { EntityDependency } from '../types';

export type EntityType =
    | 'businessunits'
    | 'menus'
    | 'routes'
    | 'prompts'
    | 'section'
    | 'schedules'
    | 'scheduleexceptions';

function useEntityDependencies(entity: EntityType, id: string, enabled: boolean) {
    const { data, isLoading } = useQuery<EntityDependency>({
        queryKey: ['dependencies', entity, id],
        queryFn: () =>
            axiosInstance
                .get<EntityDependency>(`${entity}/${id}/?dependencies=true`)
                .then((res) => res.data),
        enabled,
    });

    return { data: data?.dependencies, isLoading };
}

export default useEntityDependencies;
