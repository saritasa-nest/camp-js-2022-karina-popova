import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlanetService } from 'src/api/services/planet.service';

export const fetchPlanetsById = createAsyncThunk(
  'planets/fetch',
  async (ids: number[]) => PlanetService.fetchPlanets(ids),
);
