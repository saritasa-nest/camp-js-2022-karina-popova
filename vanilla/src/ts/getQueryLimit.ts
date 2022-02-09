import {
  DocumentData,
  endAt,
  limit,
  limitToLast,
  orderBy,
  Query,
  query,
  startAt,
} from 'firebase/firestore';

import { PaginationDirection } from '../enum/enum';
import { collectionFilmsReference } from '../ts/initializeApp';
import { lastDocFilm, PAGE_LIMIT } from '../films/renderFilms';

/**
 * Get query taking into account the limit and sorting.
 * @param paginationDirection Page switching direction.
 */
export function getQueryLimit(paginationDirection: PaginationDirection): Query<DocumentData> {
  if (paginationDirection === PaginationDirection.Next) {
    return lastDocFilm ?
      query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        startAt(lastDocFilm),
      ) : query(collectionFilmsReference, limit(PAGE_LIMIT + 1));
  }
  return lastDocFilm ?
    query(
      collectionFilmsReference,
      limit(PAGE_LIMIT + 1),
      endAt(lastDocFilm),
    ) :
    query(collectionFilmsReference, orderBy('pk'), limitToLast(PAGE_LIMIT + 1));

}
