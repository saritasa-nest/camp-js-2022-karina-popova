import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';
import { Path } from '../models/pathFields';
import { TableOptions } from '../models/table-options';

import { FirebaseService } from './firebase.service';
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
   * List of films with pagination, filtering and sorting.
   * @param options Pagination, sorting and filtering options.
   */
  public fetchFilms(options: TableOptions): Observable<readonly Film[]> {
    return this.firebaseService.fetchDocumentData('films', options, Path.Fields)
      .pipe(
        map(filmsDto => filmsDto.map(filmDto => {
          const data = filmDto['data']();
          const { id } = filmDto;
          return this.filmMapper.fromDto({ ...data, id });
        })),
      );
  }

  /** Number of films.
   * @param options Pagination, sorting and filtering options.
   */
  public getCountFilms(options: TableOptions): Observable<number> {
    return this.firebaseService.getCountDocumentData('films', options, Path.Fields);
  }

}
