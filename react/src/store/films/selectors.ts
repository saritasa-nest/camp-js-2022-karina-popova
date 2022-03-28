import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { filmAdapter } from './state';

const {
  selectAll,
  selectById,
} = filmAdapter.getSelectors();

/** Selects films from store. */
export const selectFilms = createSelector((state: RootState) => state.films.films, selectAll);

export const selectFilm = createSelector(
  [
    (state: RootState) => state.films.films,
    (_, id: string) => id,
  ],
  (films, id) => selectById(films, id),
);

/** . */
export const selectlastFilmsOnPage = createSelector(
  (
    state: RootState,
  ) => state.films.lastFilmOnPage,
  lastFilmOnPage => lastFilmOnPage,
);

/** . */
export const selectSort = createSelector((state: RootState) => state.films, films => films.sort);

/** . */
export const selectSearchValue = createSelector((state: RootState) => state.films, films => films.searchValue);

/** . */
// export const selectFilm = createSelector((state: RootState) => state.films, films => films.film);
