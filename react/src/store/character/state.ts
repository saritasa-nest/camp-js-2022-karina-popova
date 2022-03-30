import { Character } from 'src/models/characters';

/**
 * Characters state.
 */
export interface CharactersState {
  /** Characters. */
  readonly characters: Character[];
  /** Characters loading status. */
  readonly isLoading: boolean;
}

export const initialCharactersState: CharactersState = {
  characters: [],
  isLoading: false,
};
