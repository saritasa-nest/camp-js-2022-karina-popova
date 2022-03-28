import { DocumentData } from "firebase/firestore";

// * @param path Path to collection.
//    * @param limitDocs Maximum number of documents.
//    * @param orderByField Field to sort by.
//    * @param direction Optional direction to sort by ('asc' or 'desc').
//    * @param lastDoc Last doc on the page or null if the page is empty.
export interface QueryParameters {
  path: string,
  limitDocs: number,
  orderByField: string,
  direction: 'asc' | 'desc',
  lastDoc: DocumentData | null,
  searchValue: string,
}
