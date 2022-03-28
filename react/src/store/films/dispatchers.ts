import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmService } from 'src/api/services/film.service';
import { QueryParameters } from 'src/models/queryParameters';

export const fetchFilms = createAsyncThunk(
  'films/fetch',
  async (parameters?: QueryParameters) => FilmService.fetchFilms(parameters),
);

export const fetchFilmById = createAsyncThunk(
  'films/fetchById',
  async (id: string) => FilmService.fetchFilmById(id),
);
