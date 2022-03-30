import { createEntityAdapter } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';
import { Film } from 'src/models/film';
import { SortDirection } from 'src/utils/enums';

export const filmAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

/**
 * Films state.
 */
export interface FilmsState {
  /** Last document on the page. */
  readonly lastFilmOnPage: DocumentData | null;
  /** The sort direction. */
  readonly sort: SortDirection;
  /** The value to search for. */
  readonly searchValue: string;
  /** Films loading status. */
  readonly isLoading: boolean;
}

export const initialFilmsState = filmAdapter.getInitialState<FilmsState>({
  lastFilmOnPage: null,
  sort: SortDirection.Asc,
  searchValue: '',
  isLoading: false,
});

export type InitFilmsState = typeof initialFilmsState;
