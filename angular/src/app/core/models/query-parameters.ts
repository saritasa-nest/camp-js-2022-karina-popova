/** Parameters for creating query constraint. */
export interface QueryParameters {

  /** The current page index. */
  readonly pageIndex: number;

  /** Index of the page that was selected previously. */
  readonly previousPageIndex: number;

  /** The current page size. */
  readonly pageSize: number;

  /** Field to sort by. */
  sortField: string;

  /** The sort direction. */
  readonly direction: SortDirection;

  /** The value to search for. */
  readonly searchValue: string;

  /** The current total number of items being paged. */
  readonly length: number;
}

/** Sorting direction. */
export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}
