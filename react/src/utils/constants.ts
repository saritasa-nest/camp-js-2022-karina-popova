import { SortDirection } from './enums';

export const DEFAULT_PATH_FILMS = 'films';
export const DEFAULT_SORTING_FIELD = 'fields.title';
export const DEFAULT_LIMIT_FILMS = 3;

export const DEFAULT_QUERY_PARAMETRS_FETCH_FILMS = {
  path: DEFAULT_PATH_FILMS,
  limitDocs: DEFAULT_LIMIT_FILMS,
  orderByField: DEFAULT_SORTING_FIELD,
  direction: SortDirection.Asc,
  lastDoc: null,
  searchValue: '',
};
