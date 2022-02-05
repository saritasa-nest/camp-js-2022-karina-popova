import { PageArrow } from '../enum/enum';
import {
  DocumentData,
  endBefore,
  limit,
  Query,
  query,
  startAt,
} from 'firebase/firestore';
import { collectionFilmsReference } from '../ts/initializeApp';
import { lastDocFilm, pageLimit } from '../films/renderFilms';

export function getQueryLimit(pageArrow?: PageArrow): Query<DocumentData> {
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
          endBefore(lastDocFilm)
        )
      : query(collectionFilmsReference, limit(pageLimit + 1));
  }
}
