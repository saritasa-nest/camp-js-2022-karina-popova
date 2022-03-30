import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { filmAdapter } from './state';

const {
  selectAll,
  selectById,
} = filmAdapter.getSelectors();

/** Selects films from store. */
export const selectFilms = createSelector((state: RootState) => state.films, selectAll);

/** Selects film by id from store.
 * @param state Root state.
 * @param id Film id.
 * @param _ .
 */
export const selectFilm = createSelector(
  [
    (state: RootState) => state.films,
    (_, id: string) => id,
  ],
  (films, id) => selectById(films, id),
);

/** Selects last films on the page from store. */
export const selectlastFilmsOnPage = createSelector(
  (
    state: RootState,
  ) => state.films.lastFilmOnPage,
  lastFilmOnPage => lastFilmOnPage,
);

/** Selects sorting from store. */
export const selectSort = createSelector((state: RootState) => state.films, films => films.sort);

/** Selects searching value from store. */
export const selectSearchValue = createSelector((state: RootState) => state.films, films => films.searchValue);

/** Selects films loading from store. */
export const selectIsLoading = createSelector((state: RootState) => state.films, films => films.isLoading);
