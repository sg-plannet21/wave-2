import { Dictionary, keyBy } from 'lodash';

function entityLookup<T>(list: Array<T>, key: keyof T): Dictionary<T> {
  return keyBy(list, key);
}

/*
function entityLookup<T>(key: keyof T) {
  return function transform(data: Array<T>): Dictionary<T> {
    return keyBy(data, key);
  };
}
*/

export type LookupSelectType<T> = (data: Array<T>) => Dictionary<T>;

export default entityLookup;
