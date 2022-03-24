/** Parameters for creating query constraint. */
export interface QueryParameters {

  /** The current page index. */
  pageIndex: number;

  /** Index of the page that was selected previously. */
  previousPageIndex?: number;

  /** The current page size. */
  pageSize: number;

  /** The sort field. */
  active: string;

  /** The sort direction. */
  direction: 'asc' | 'desc' | '';

  /** The search value. */
  searchValue: string;
}
