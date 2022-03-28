import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';
import { fetchFilmById, fetchFilms } from './dispatchers';
import { initialFilmsState } from './state';

export const filmAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

export const filmsSlice = createSlice({
  name: 'films',
  initialState: initialFilmsState,
  reducers: {
    searching(state, { payload }) {
      state.searchValue = payload;
      state.films = [];
      state.lastFilmOnPage = null;
    },
    sorting(state, { payload }) {
      state.sort = payload;
      state.films = [];
      state.lastFilmOnPage = null;
    },
  },
  extraReducers: builder => builder
    .addCase(fetchFilms.fulfilled, (state, { payload }) => {
      state.films = [...state.films, ...payload.films];
      state.lastFilmOnPage = payload.lastFilmOnPage;
    }),
});

export const { searching, sorting } = filmsSlice.actions;
