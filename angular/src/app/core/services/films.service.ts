import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';

import { FirebaseService } from './firebase.service';
import { FilmDto } from './mappers/dto/film/film.dto';
import { FilmMapper } from './mappers/film.mapper';

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
   * @param _options Pagination options.
   */
  public fetchFilms(_options: PageEvent & Sort): Observable<readonly Film[]> {
    return this.firebaseService.fetchDocumentData('films', _options)
      .pipe(
        map(filmsDto => filmsDto.map(filmDto => {
          const data = filmDto['data']() as FilmDto;
          const { id } = filmDto;
          return this.filmMapper.fromDto({ ...data, id });
        })),
      );
  }

  /** * Number of films. */
  public getCountFilms(): Observable<number> {
    return this.firebaseService.getCountDocumentData('films');
  }

}
