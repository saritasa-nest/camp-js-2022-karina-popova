import {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { getDocsFilms } from '../ts/getDocsFilms';
import { ChangePage } from '../enum/enum';
import { getQueryLimit } from '../ts/getQueryLimit';

import { getFilms } from './getFilms';
import { getPatternFilms } from './getPatternFilms';

export const PAGE_LIMIT = 3;
export let lastDocFilm: QueryDocumentSnapshot<DocumentData> | null = null;
const container = document.querySelector<Element>('tbody');

/**
 * Display films.
 * @param changePage Page switching direction.
 */
export async function renderFilms(changePage: ChangePage = ChangePage.Next): Promise<void> {
  const collectionLimitFilmsReference = getQueryLimit(changePage);
  const docsFilms = await getDocsFilms(collectionLimitFilmsReference);
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
