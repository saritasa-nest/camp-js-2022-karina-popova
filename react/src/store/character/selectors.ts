import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

/** Selects characters loading from store. */
export const selectCharactersIsLoading = createSelector(
  (
    state: RootState,
  ) => state.character,
  character => character.isLoading,
);

/** Selects characters from store. */
export const selectCharacters = createSelector(
  (
    state: RootState,
  ) => state.character,
  character => character.characters,
);
