import { createSlice } from '@reduxjs/toolkit';
import { fetchCharactersById } from './dispatchers';
import { initialCharactersState } from './state';

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialCharactersState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchCharactersById.pending, state => {
      state.isLoading = false;
    })
    .addCase(fetchCharactersById.fulfilled, (state, { payload }) => {
      state.characters = payload;
      state.isLoading = true;
    }),
});
