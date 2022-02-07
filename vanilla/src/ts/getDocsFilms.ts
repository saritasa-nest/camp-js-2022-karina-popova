import {
  CollectionReference,
  DocumentData,
  getDocs,
  Query,
  QuerySnapshot,
} from 'firebase/firestore';

/**
 * QuerySnapshot: QuerySnapshot, film: DocumentData, id: string
 * Film.
 * @param collectionFilmsReference Film.
 */
export async function getDocsFilms(
  collectionFilmsReference: CollectionReference | Query,
): Promise<QuerySnapshot<DocumentData>> {
  const querySnapshot = await getDocs(collectionFilmsReference);
  return querySnapshot;
}
