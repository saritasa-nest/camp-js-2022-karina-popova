import {
  CollectionReference,
  DocumentData,
  getDocs,
  Query,
  QuerySnapshot,
} from 'firebase/firestore';

/**
 * Fetches collection documents by reference on firebase.
 * @param collectionFilmsReference The type of this Firestore reference.
 */
export async function getDocsFilms(
  collectionFilmsReference: CollectionReference | Query,
): Promise<QuerySnapshot<DocumentData>> {
  const querySnapshot = await getDocs(collectionFilmsReference);
  return querySnapshot;
}
