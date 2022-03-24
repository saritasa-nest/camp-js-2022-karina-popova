/** Sorting and filtering pagination options. */
export interface TableOptions {

  /** The current page index. */
  readonly pageIndex: number;

  /** Index of the page that was selected previously. */
  readonly previousPageIndex?: number;

  /** The current page size. */
  readonly pageSize: number;

  /** The current total number of items being paged. */
  readonly length: number;

  /** The id of the column being sorted. */
  readonly active: string;

  /** The sort direction. */
  readonly direction: 'asc' | 'desc' | '';

  /** The search value. */
  readonly searchValue: string;
}
