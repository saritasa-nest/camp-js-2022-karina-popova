import { createSlice } from '@reduxjs/toolkit';
import { fetchPlanetsById } from './dispatchers';
import { initialPlanetsState } from './state';

export const planetsSlice = createSlice({
  name: 'planets',
  initialState: initialPlanetsState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchPlanetsById.pending, state => {
      state.isLoading = false;
    })
    .addCase(fetchPlanetsById.fulfilled, (state, { payload }) => {
      state.planets = payload;
      state.isLoading = true;
    }),
});
