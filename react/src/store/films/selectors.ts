import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { filmAdapter } from './slice';

/** Selects films from store. */
export const selectFilms = createSelector((state: RootState) => state.films.films, films => films);

/** . */
export const selectlastFilmsOnPage = createSelector(
  (
    state: RootState,
  ) => state.films.lastFilmOnPage,
  lastFilmOnPage => lastFilmOnPage,
);

/** . */
export const selectSort = createSelector((state: RootState) => state.films.sort, sort => sort);

/** . */
export const selectSearchValue = createSelector((state: RootState) => state.films.searchValue, searchValue => searchValue);

/** . */
export const selectFilm = filmAdapter.getSelectors((state: RootState) => state);
