/** Sorting and filtering pagination options. */
export interface TableOptions {

  /** The current page index. */
  readonly pageIndex: number;

  /** Index of the page that was selected previously. */
  readonly previousPageIndex: number;

  /** The current page size. */
  readonly pageSize: number;

  /** The current total number of items being paged. */
  readonly length: number;

  /** Field to sort by. */
  readonly sortField: string;

  /** The sort direction. */
  readonly direction: SortDirection;

  /** The value to search for. */
  readonly searchValue: string;
}

/** Sorting direction. */
export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}
