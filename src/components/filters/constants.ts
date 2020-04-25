import { ICategoryItem } from './blocks/categories';

export interface IOption {
  id: number;
  label: string;
  value: string;
}

export const CATEGORIES: ICategoryItem[] = [
  { id: 0, label: 'business' },
  { id: 1, label: 'sports' },
  { id: 2, label: 'entertainment' },
  { id: 3, label: 'general' },
  { id: 4, label: 'health' },
  { id: 5, label: 'science' },
  { id: 6, label: 'technology' },
];

export const PAGES: ICategoryItem[] = [
  { id: 0, label: 'headlines' },
  { id: 1, label: 'all' },
  { id: 2, label: 'sources' },
];

export const ORDER_OPTIONS: IOption[] = [
  { id: 0, label: '↑', value: 'asc' },
  { id: 1, label: '↓', value: 'desc' },
];
