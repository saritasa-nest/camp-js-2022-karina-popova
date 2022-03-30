/**  Pagination parameters that are passed to the service. */
export interface PaginationParameters {

  /** The current page index. */
  readonly pageIndex: number;

  /** Index of the page that was selected previously. */
  readonly previousPageIndex?: number;

  /** The current page size. */
  readonly pageSize: number;

  /** The current total number of items being paged. */
  readonly length: number;
}
