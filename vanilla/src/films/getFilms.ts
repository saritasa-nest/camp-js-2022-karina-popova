import { CollectionReference, DocumentData, Query } from 'firebase/firestore';

import { getDocuments } from '../ts/getDocuments';

import { Film } from './film';

/**
 * Get array of films.
 * @param collectionReference A CollectionReference object can be used for adding documents,
 *  getting document references, and querying for documents.
 */
export async function getFilms(collectionReference: CollectionReference<DocumentData> | Query<DocumentData>): Promise<Film[]> {
  const querySnapshot = await getDocuments(collectionReference);

  return querySnapshot.docs.map(doc => {
    const { fields } = doc.data();
    const item: Film = {
      id: doc.id,
      created: new Date(fields.created),
      director: fields.director,
      edited: new Date(fields.edited),
      openingCrawl: fields.episode_id,
      producer: fields.producer,
      releaseDate: fields.release_date,
      title: fields.title,
    };
    return item;
  });
}
