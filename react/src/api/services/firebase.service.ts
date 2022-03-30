import {
  getFirestore,
  getDocs,
  collection,
  DocumentData,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  getDoc,
  doc,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { QueryParameters } from 'src/models/queryParameters';
import { app } from './initializeApp';

const db = getFirestore(app);
/**
 * Character to search for the first letters in the string.
 */
const SEARCH_SYMBOL = '~';

export namespace FirebaseService {
  /**
   * Fetch list of all document data.
   * @param path Path to collection.
   */
  export async function fetchDocumentsData(path: string): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    const docs = await getDocs(collection(db, path));
    return docs.docs;
  }
  /**
   * Fetch list of all document data.
   * @param parameters Sorting, pagination and filtering options.
   */
  export async function fetchSortedDocumentsData(
    parameters: QueryParameters,
  ): Promise<DocumentData[]> {
    const queryCollection = parameters.lastDoc
      ? query(
        collection(db, parameters.path),
        where(parameters.orderByField, '>=', parameters.searchValue),
        where(
          parameters.orderByField,
          '<=',
          `${parameters.searchValue}${SEARCH_SYMBOL}`,
        ),
        orderBy(parameters.orderByField, parameters.direction),
        startAfter(parameters.lastDoc),
        limit(parameters.limitDocs + 1),
      )
      : query(
        collection(db, parameters.path),
        where(parameters.orderByField, '>=', parameters.searchValue),
        where(
          parameters.orderByField,
          '<=',
          `${parameters.searchValue}${SEARCH_SYMBOL}`,
        ),
        orderBy(parameters.orderByField, parameters.direction),
        limit(parameters.limitDocs),
      );
    const querySnapshot = await getDocs(queryCollection);
    return querySnapshot.docs;
  }

  /** Fetch documents with specified field.
   * @param path Path to collection.
   * @param pathField Path to a field with nested fields in the document data.
   * @param value The value for comparison.Array must be up to 10 elements.
   */
  export async function fetchDocumentDataByField(
    path: string,
    pathField: string,
    value: number[],
  ): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    const docs = await getDocs(query(collection(db, path), where(pathField, 'in', value.slice(0, 10))));
    return docs.docs;
  }

  /**
   * Fetch document data by id.
   * @param path Path to collection.
   * @param id Document id.
   */
  export async function fetchDocumentDataById(
    path: string,
    id: string,
  ): Promise<DocumentData> {
    const querySnapshot = await getDoc(doc(db, path, id));
    return querySnapshot;
  }
}
