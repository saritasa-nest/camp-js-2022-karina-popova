import { PageArrow } from '../enum/enum';
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
import { collectionFilmsReference } from '../ts/initializeApp';
import { lastDocFilm, pageLimit } from '../films/renderFilms';

export function getQueryLimit(pageArrow: PageArrow): Query<DocumentData> {
  if (pageArrow == PageArrow.Next) {
    return lastDocFilm
      ? query(
          collectionFilmsReference,
          limit(pageLimit + 1),
          startAt(lastDocFilm)
        )
      : query(collectionFilmsReference, limit(pageLimit + 1));
  } else {
    return lastDocFilm
    ? query(
        collectionFilmsReference,
        limit(pageLimit + 1),
        endAt(lastDocFilm)
      )
    : query(collectionFilmsReference, orderBy('pk'), limitToLast(pageLimit + 1));
  }
}
