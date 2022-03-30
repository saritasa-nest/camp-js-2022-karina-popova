import { createAsyncThunk } from '@reduxjs/toolkit';
import { CharacterService } from 'src/api/services/character.service';

export const fetchCharactersById = createAsyncThunk(
  'characters/fetch',
  async (ids: number[]) => CharacterService.fetchCharacters(ids),
);
