import { CollectionReference, Query } from 'firebase/firestore';

import { getDocsFilms } from '../ts/getDocsFilms';

import { Film } from './film';

/**
 * Get array films.
 * @param collectionFilmsReference A CollectionReference object can be used for adding documents,
 *  getting document references, and querying for documents.
 * @returns Promise<Film[]>.
 */
export async function getFilms(collectionFilmsReference: CollectionReference | Query): Promise<Film[]> {
  const querySnapshot = await getDocsFilms(collectionFilmsReference);

  const films = querySnapshot.docs.map(doc => {
      const item: Film = {
        id: doc.id,
        created: new Date(doc.data().fields.created),
        director: doc.data().fields.director,
        edited: new Date(doc.data().fields.edited),
        openingCrawl: doc.data().fields.episode_id,
        producer: doc.data().fields.producer,
        releaseDate: doc.data().fields.release_date,
        title: doc.data().fields.title,
      };
      return item;
    });
  return films;
}
