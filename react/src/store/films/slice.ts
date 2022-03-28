import { createSlice, EntityState } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';
import { fetchFilmById, fetchFilms } from './dispatchers';
import { filmAdapter, initialFilmsState } from './state';

export const filmsSlice = createSlice({
  name: 'films',
  initialState: initialFilmsState,
  reducers: {
    searching(state, { payload }) {
      state.searchValue = payload;
      filmAdapter.setAll(state.films as EntityState<Film>, []);
      state.lastFilmOnPage = null;
    },
    sorting(state, { payload }) {
      state.sort = payload;
      filmAdapter.setAll(state.films as EntityState<Film>, []);
      state.lastFilmOnPage = null;
    },
  },
  extraReducers: builder => builder
    .addCase(fetchFilms.fulfilled, (state, { payload }) => {
      filmAdapter.upsertMany(state.films as EntityState<Film>, payload.films);
      state.lastFilmOnPage = payload.lastFilmOnPage;
    })
    .addCase(fetchFilmById.fulfilled, (state, { payload }) => {
      filmAdapter.upsertOne(state.films as EntityState<Film>, payload);
    }),
});

export const { searching, sorting } = filmsSlice.actions;
