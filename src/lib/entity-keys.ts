import storage from '@/utils/storage';

type QueryKeyItemType = number | string;

export function businessUnitQueryKey(
  ...rest: QueryKeyItemType[]
): QueryKeyItemType[] {
  return [storage.businessUnit.getBusinessUnit().label, ...rest];
}

type EntityKey = 'users' | 'routes' | 'messages';
export function getEntityKey(entity: EntityKey): string[] {
  return [storage.businessUnit.getBusinessUnit().label, entity];
}
