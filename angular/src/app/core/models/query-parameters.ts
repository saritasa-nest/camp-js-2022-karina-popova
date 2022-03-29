import { PaginationParameters } from './pagination-parameters';
import { SortDirection } from './sort-parameters';

/** Parameters for creating query constraint. */
export type QueryParameters = PaginationParameters & {

  /** Field to sort by. */
  sortField: string;

  /** The sort direction. */
  readonly direction: SortDirection;

  /** The value to search for. */
  readonly searchValue: string;
};
