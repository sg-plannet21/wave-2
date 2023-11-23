import { orderBy } from 'lodash';

function orderCollection<T>(
  data: Array<T>,
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): Array<T> {
  return orderBy(data, [key], direction);
}

export default orderCollection;
