import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';

import { Film } from '../models/film';
import { Path } from '../models/path';
import { Planet } from '../models/planet';
import { QueryParameters } from '../models/query-parameters';

import { FirebaseService } from './firebase.service';
import { FilmDto } from './mappers/dto/film/film.dto';
import { PeopleDto } from './mappers/dto/people/people.dto';
import { PlanetDto } from './mappers/dto/planet/planet.dto';
import { FilmMapper } from './mappers/film.mapper';
import { PlanetMapper } from './mappers/planet.mapper';

/**
 * Film service.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private lastFilm: QueryDocumentSnapshot<unknown> | null = null;

  private firstFilm: QueryDocumentSnapshot<unknown> | null = null;

  public constructor(
    private readonly firebaseService: FirebaseService,
    private readonly filmMapper: FilmMapper,
    private readonly planetMapper: PlanetMapper,
  ) { }

  /**
   * List of films with pagination, filtering and sorting.
   * @param options Pagination, sorting and filtering options.
   */
  public fetchFilms(options: QueryParameters): Observable<Film[]> {
    return this.firebaseService
      .fetchSortedDocumentsData('films', options, Path.Fields, this.lastFilm, this.firstFilm)
      .pipe(
        tap(v => {
          this.lastFilm = v[v.length - 1];
          this.firstFilm = v[0];
        }),
        map(filmsDto => {
          if (filmsDto) {
            return filmsDto.map(filmDto => {
              const { id } = filmDto;
              return this.filmMapper.fromDto({ ...(filmDto.data() as FilmDto), id });
            });
          }
          return [];
        }),
      );
  }

  /**
   * Get a film by id.
   * @param id Film id.
   */
  public fetchFilmById(id: string): Observable<Film> {
    return this.firebaseService.fetchDocumentDataById('films', id).pipe(
      map(filmDto => this.filmMapper.fromDto({ ...(filmDto.data() as FilmDto), id })),
    );
  }

  /**
   * Returns number of films.
   * @param options Pagination, sorting and filtering options.
   */
  public getCountFilms(options: QueryParameters): Observable<number> {
    return this.firebaseService.getCountDocumentData(
      'films',
      options,
      Path.Fields,
    );
  }
}
