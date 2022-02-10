import { DocumentData, endAt, limit, limitToLast, orderBy, query, Query, startAt, where } from 'firebase/firestore';

import { PaginationDirection } from '../enum/PaginationDirection';
import { PAGE_LIMIT } from '../films/renderFilms';
import { StoreService } from '../services/StoreService';

import { collectionFilmsReference } from './initializeApp';

const SEARCH_FIELD = 'fields.title';
const DEFAULT_ORDER = SEARCH_FIELD;
const FIREBASE_SEARCH_SYMBOL = '~';

/**
 * Get query taking into account the limit, sorting and search.
 * @param paginationDirection Page switching direction.
 * @param searchText Search filter text.
 */
export function getQuerySearch(paginationDirection: PaginationDirection, searchText: string): Query<DocumentData> {
  const { firstDocFilm, lastDocFilm } = StoreService.getStore();

  if (paginationDirection === PaginationDirection.Next) {
    return lastDocFilm ?
      query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        orderBy(DEFAULT_ORDER),
        startAt(lastDocFilm),
        where(SEARCH_FIELD, '>=', searchText),
        where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
      ) :
      query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        orderBy(DEFAULT_ORDER),
        where(SEARCH_FIELD, '>=', searchText),
        where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
      );
  }
  return firstDocFilm ?
    query(
      collectionFilmsReference,
      limit(PAGE_LIMIT + 1),
      orderBy(DEFAULT_ORDER),
      endAt(firstDocFilm),
      where(SEARCH_FIELD, '>=', searchText),
      where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
    ) :
    query(
      collectionFilmsReference,
      limitToLast(PAGE_LIMIT + 1),
      orderBy(DEFAULT_ORDER),
      where(SEARCH_FIELD, '>=', searchText),
      where(SEARCH_FIELD, '<=', `${searchText}${FIREBASE_SEARCH_SYMBOL}`),
    );

}
