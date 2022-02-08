import { DocumentData, endAt, limit, limitToLast, orderBy, query, Query, startAt, where } from 'firebase/firestore';

import { PaginationDirection } from '../enum/enum';
import { firstDocFilm, lastDocFilm, PAGE_LIMIT } from '../films/renderFilms';

import { collectionFilmsReference } from './initializeApp';

export function getQuerySearch(paginationDirection: PaginationDirection, searchText: string): Query<DocumentData> {
  if (paginationDirection === PaginationDirection.Next) {
    const a = lastDocFilm ?
      query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        orderBy('fields.title'),
        startAt(lastDocFilm),
        where('fields.title', '>=', searchText),
        where('fields.title', '<=', `${searchText}~`),
      ) :
      query(
        collectionFilmsReference,
        limit(PAGE_LIMIT + 1),
        orderBy('fields.title'),
        where('fields.title', '>=', searchText),
        where('fields.title', '<=', `${searchText}~`),
      );
    return a;
  }
  return firstDocFilm ?
    query(
      collectionFilmsReference,
      limit(PAGE_LIMIT + 1),
      orderBy('fields.title'),
      endAt(firstDocFilm),
      where('fields.title', '>=', searchText),
      where('fields.title', '<=', `${searchText}~`),
    ) :
    query(
      collectionFilmsReference,
      limitToLast(PAGE_LIMIT + 1),
      orderBy('fields.title'),
      where('fields.title', '>=', searchText),
      where('fields.title', '<=', `${searchText}~`),
    );

}
