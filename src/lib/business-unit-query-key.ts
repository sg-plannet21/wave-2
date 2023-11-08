import storage from '@/utils/storage';

type QueryKeyItemType = number | string;

export default function businessUnitQueryKey(
  ...rest: QueryKeyItemType[]
): QueryKeyItemType[] {
  return [storage.businessUnit.getBusinessUnit().label, ...rest];
}
