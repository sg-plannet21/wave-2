import storage from '@/utils/storage';

type QueryKeyItemType = number | string;

export function businessUnitQueryKey(
  ...rest: QueryKeyItemType[]
): QueryKeyItemType[] {
  return [storage.businessUnit.getBusinessUnit().label, ...rest];
}

type EntityKey =
  | 'entry-points'
  | 'routes'
  | 'route-destinations'
  | 'messages'
  | 'sections'
  | 'menus'
  | 'queues'
  | 'business-unit-roles';

export function getEntityKey(entity: EntityKey): string[] {
  return [storage.businessUnit.getBusinessUnit().label, entity];
}
