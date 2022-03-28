import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
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
  /** Films. */
  readonly films: EntityState<Film>;
  /** . */
  readonly lastFilmOnPage: DocumentData | null;
  /** . */
  readonly sort: SortDirection;
  /** . */
  readonly searchValue: string;
}

export const initialFilmsState: FilmsState = {
  films: filmAdapter.getInitialState(),
  lastFilmOnPage: null,
  sort: SortDirection.Asc,
  searchValue: '',
};
