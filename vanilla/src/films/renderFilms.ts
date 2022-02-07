import {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { getDocsFilms } from '../ts/getDocsFilms';
import { PageArrow } from '../enum/enum';
import { getQueryLimit } from '../ts/getQueryLimit';

import { getFilms } from './getFilms';
import { getPatternFilms } from './getPatternFilms';

export const pageLimit = 3;
export let lastDocFilm: QueryDocumentSnapshot<DocumentData> | null = null;
const container = document.querySelector<Element>('tbody');

/**
 * Display films.
 * @param pageArrow Page switching direction.
 */
export async function renderFilms(pageArrow: PageArrow = PageArrow.Next): Promise<void> {
  const collectionLimitFilmsReference = getQueryLimit(pageArrow);
  const docsFilms = await getDocsFilms(collectionLimitFilmsReference);
  const films = await getFilms(collectionLimitFilmsReference);

  if (container) {
    container.innerHTML = '';
  }

  container?.insertAdjacentHTML(
    'afterbegin',
    getPatternFilms(films.slice(0, pageLimit)),
  );

  if (lastDocFilm !== undefined) {
    lastDocFilm = docsFilms.docs[pageLimit] ?? null;
  }
}
