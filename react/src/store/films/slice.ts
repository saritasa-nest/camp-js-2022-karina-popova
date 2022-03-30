import { createSlice } from '@reduxjs/toolkit';
import { fetchFilmById, fetchFilms } from './dispatchers';
import { filmAdapter, InitFilmsState, initialFilmsState } from './state';

export const filmsSlice = createSlice({
  name: 'films',
  initialState: initialFilmsState,
  reducers: {
    searching(state, { payload }) {
      state.searchValue = payload;
      filmAdapter.setAll(state as InitFilmsState, []);
      state.lastFilmOnPage = null;
    },
    sorting(state, { payload }) {
      state.sort = payload;
      filmAdapter.setAll(state as InitFilmsState, []);
      state.lastFilmOnPage = null;
    },
  },
  extraReducers: builder => builder
    .addCase(fetchFilms.pending, state => {
      state.isLoading = false;
    })
    .addCase(fetchFilms.fulfilled, (state, { payload }) => {
      filmAdapter.upsertMany(state as InitFilmsState, payload.films);
      state.isLoading = true;
      state.lastFilmOnPage = payload.lastFilmOnPage;
    })
    .addCase(fetchFilmById.pending, state => {
      state.isLoading = false;
    })
    .addCase(fetchFilmById.fulfilled, (state, { payload }) => {
      filmAdapter.upsertOne(state as InitFilmsState, payload);
      state.isLoading = true;
    }),
});

export const { searching, sorting } = filmsSlice.actions;
