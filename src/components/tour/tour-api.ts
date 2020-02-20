import { TourData } from './types';
import { mockData } from './mock-data';

export function getTourData(): Promise<TourData> {
  return new Promise(res => setTimeout(() => res(mockData), 500))
}
