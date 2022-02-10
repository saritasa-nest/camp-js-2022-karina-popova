import {
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import { getDocuments } from '../ts/getDocuments';
import { PaginationDirection } from '../enum/PaginationDirection';
import { getQueryLimit } from '../ts/getQueryLimit';

import { getQuerySearch } from '../ts/getQuerySearch';

import { StoreService } from '../services/StoreService';

import { getFilms } from './getFilms';
import { getPatternFilms } from './getPatternFilms';

export const PAGE_LIMIT = 3;
const container = document.querySelector<Element>('tbody');

/**
 * Display films.
 * @param paginationDirection Page switching direction.
 */
export async function renderFilms(paginationDirection: PaginationDirection = PaginationDirection.Next): Promise<void> {
  const { searchText } = StoreService.getStore();

  const collectionLimitFilmsReference = searchText === '' ?
    getQueryLimit(paginationDirection) :
    getQuerySearch(paginationDirection, searchText);

  const docsFilms = await getDocuments(collectionLimitFilmsReference);
  const films = await getFilms(collectionLimitFilmsReference);

  if (container) {
    container.innerHTML = '';
  }

  container?.insertAdjacentHTML(
    'afterbegin',
    getPatternFilms(films.slice(0, PAGE_LIMIT)),
  );

  StoreService.setStore({
    lastDocFilm: docsFilms.docs[PAGE_LIMIT] ?? null,
    firstDocFilm: docsFilms.docs[0] ?? null,
  });
}

/** Resets document film cursor, to fetch data from the beginning.  */
export function resetDocFilms(): void {
  StoreService.setStore({
    lastDocFilm: null,
    firstDocFilm: null,
  });
}
