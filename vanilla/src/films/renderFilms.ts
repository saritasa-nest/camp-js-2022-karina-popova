import {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { getDocuments } from '../ts/getDocuments';
import { PaginationDirection } from '../enum/enum';
import { getQueryLimit } from '../ts/getQueryLimit';

import { getFilms } from './getFilms';
import { getPatternFilms } from './getPatternFilms';

export const PAGE_LIMIT = 3;
export let lastDocFilm: QueryDocumentSnapshot<DocumentData> | null = null;
const container = document.querySelector<Element>('tbody');

/**
 * Display films.
 * @param paginationDirection Page switching direction.
 */
export async function renderFilms(paginationDirection: PaginationDirection = PaginationDirection.Next): Promise<void> {
  const collectionLimitFilmsReference = getQueryLimit(paginationDirection);
  const docsFilms = await getDocuments(collectionLimitFilmsReference);
  const films = await getFilms(collectionLimitFilmsReference);

  if (container) {
    container.innerHTML = '';
  }

  container?.insertAdjacentHTML(
    'afterbegin',
    getPatternFilms(films.slice(0, PAGE_LIMIT)),
  );

  if (lastDocFilm !== undefined) {
    lastDocFilm = docsFilms.docs[PAGE_LIMIT] ?? null;
  }
}
