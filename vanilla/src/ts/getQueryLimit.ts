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

import { PaginationDirection } from '../enum/PaginationDirection';
import { collectionFilmsReference } from '../ts/initializeApp';
import { PAGE_LIMIT } from '../films/renderFilms';
import { StoreService } from '../services/StoreService';

const DEFAULT_ORDER = 'pk';

/**
 * Get query taking into account the limit and sorting.
 * @param paginationDirection Page switching direction.
 */
export function getQueryLimit(paginationDirection: PaginationDirection): Query<DocumentData> {
  const { firstDocFilm, lastDocFilm } = StoreService.getStore();

  if (paginationDirection === PaginationDirection.Next) {
    return lastDocFilm ?
      query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        orderBy(DEFAULT_ORDER),
        startAt(lastDocFilm),
      ) : query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        orderBy(DEFAULT_ORDER),
      );
  }
  return firstDocFilm ?
    query(
      collectionFilmsReference,
      orderBy(DEFAULT_ORDER),
      limitToLast(PAGE_LIMIT + 1),
      endAt(firstDocFilm),
    ) :
    query(
      collectionFilmsReference,
      limitToLast(PAGE_LIMIT + 1),
      orderBy(DEFAULT_ORDER),
    );

}
