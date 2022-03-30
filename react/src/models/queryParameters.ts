import { DocumentData } from 'firebase/firestore';

/** Parameters for creating query constraint. */
export interface QueryParameters {
  /** Path to collection. */
  path: string;
  /** Maximum number of documents. */
  limitDocs: number;
  /** Field to sort by. */
  orderByField: string;
  /** Optional direction to sort by ('asc' or 'desc'). */
  direction: 'asc' | 'desc';
  /** Last doc on the page or null if the page is empty. */
  lastDoc: DocumentData | null;
  /** The value to search for. */
  searchValue: string;
}
