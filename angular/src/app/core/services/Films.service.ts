import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';

import { FirebaseService } from './Firebase.service';
import { FilmDto } from './mappers/dto/Film/film.dto';
import { FilmMapper } from './mappers/Film.mapper';

/**
 * Film service.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  public constructor(
    private readonly firebaseService: FirebaseService,
    private readonly filmMapper: FilmMapper,
  ) { }

  /**
   * List of all films with information.
   */
  public fetchFilms(): Observable<readonly Film[]> {
    return this.firebaseService.fetchDocumentData('films').pipe(map(filmsDto => filmsDto.map(filmDto => {
        const data = filmDto['data']() as FilmDto;
        const { id } = filmDto;
        return this.filmMapper.fromDto({ ...data, id });
      })));
  }
}
