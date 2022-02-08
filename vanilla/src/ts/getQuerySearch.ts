import { DocumentData, endAt, limit, limitToLast, orderBy, query, Query, startAt, where } from 'firebase/firestore';

import { PaginationDirection } from '../enum/enum';
import { firstDocFilm, lastDocFilm, PAGE_LIMIT } from '../films/renderFilms';

import { collectionFilmsReference } from './initializeApp';

const SEARCH_FIELD = 'fields.title';
const DEFAULT_ORDER = SEARCH_FIELD;

/**
 * Get query taking into account the limit, sorting and search.
 * @param paginationDirection Page switching direction.
 * @param searchText Search filter text.
 * @returns
 */
export function getQuerySearch(paginationDirection: PaginationDirection, searchText: string): Query<DocumentData> {
  if (paginationDirection === PaginationDirection.Next) {
    return lastDocFilm ?
      query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        orderBy(DEFAULT_ORDER),
        startAt(lastDocFilm),
        where(SEARCH_FIELD, '>=', searchText),
        where(SEARCH_FIELD, '<=', `${searchText}~`),
      ) :
      query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        orderBy(DEFAULT_ORDER),
        where(SEARCH_FIELD, '>=', searchText),
        where(SEARCH_FIELD, '<=', `${searchText}~`),
      );
  }
  return firstDocFilm ?
    query(
      collectionFilmsReference,
      limit(PAGE_LIMIT + 1),
      orderBy(DEFAULT_ORDER),
      endAt(firstDocFilm),
      where(SEARCH_FIELD, '>=', searchText),
      where(SEARCH_FIELD, '<=', `${searchText}~`),
    ) :
    query(
      collectionFilmsReference,
      limitToLast(PAGE_LIMIT + 1),
      orderBy(DEFAULT_ORDER),
      where(SEARCH_FIELD, '>=', searchText),
      where(SEARCH_FIELD, '<=', `${searchText}~`),
    );

}
