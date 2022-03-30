import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

/** Selects planets loading from store. */
export const selectIsLoading = createSelector((state: RootState) => state.planets, planets => planets.isLoading);

/** Selects planets from store. */
export const selectPlanets = createSelector((state: RootState) => state.planets, planets => planets.planets);
