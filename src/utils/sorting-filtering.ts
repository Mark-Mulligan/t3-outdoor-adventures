// Types
import { ParkTableData } from '../customTypes/parks';

export const sortParks = (parks: ParkTableData[], column: keyof ParkTableData, direction: 'asc' | 'desc') => {
  return parks.sort((a, b) => {
    if (direction === 'asc') {
      return a[column].localeCompare(b[column]);
    }

    return b[column].localeCompare(a[column]);
  });
};
