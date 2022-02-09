import {
  CollectionReference,
  getDocs,
  Query,
  QuerySnapshot,
} from 'firebase/firestore';

/**
 * Fetches collection documents by reference on firebase.
 * @param collectionFilmsReference The type of this Firestore reference.
 */
export function getDocuments<T>(
  collectionFilmsReference: CollectionReference<T> | Query<T>,
): Promise<QuerySnapshot<T>> {
  return getDocs(collectionFilmsReference);
}
