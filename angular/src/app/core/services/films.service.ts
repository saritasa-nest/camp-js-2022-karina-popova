import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';
import { Path } from '../models/path';
import { Planet } from '../models/planet';
import { TableOptions } from '../models/table-options';

import { FirebaseService } from './firebase.service';
import { FilmMapper } from './mappers/film.mapper';
import { PlanetMapper } from './mappers/planet.mapper';

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
    private readonly planetMapper: PlanetMapper,
  ) {}

  /**
   * List of films with pagination, filtering and sorting.
   * @param options Pagination, sorting and filtering options.
   */
  public fetchFilms(options: TableOptions): Observable<Film[]> {
    return this.firebaseService
      .fetchSortedDocumentsData('films', options, Path.Fields)
      .pipe(
        map(filmsDto => {
          if (filmsDto) {
            return filmsDto.map(filmDto => {
              const { id } = filmDto;
              return this.filmMapper.fromDto({ ...filmDto['data'](), id });
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
      map(filmDto => this.filmMapper.fromDto({ ...filmDto['data'](), id })),
    );
  }

  /**
   * List of planets that are in this film.
   * @param ids List of planet ids.
   */
  public fetchPlanets(ids?: readonly number[]): Observable<Planet[]> {
    let planetsDocuments$: Observable<DocumentData[]>;
    if (ids != null) {
      planetsDocuments$ = this.firebaseService.fetchDocumentsDataByField(
        'planets',
        'pk',
        ids,
      );
    } else {
      planetsDocuments$ = this.firebaseService.fetchDocumentsData('planets');
    }
    return planetsDocuments$.pipe(
      map(planetsDoc =>
        planetsDoc.map(doc => this.planetMapper.fromDto(doc['data']()))),
    );
  }

  /**
   * List of characters that are in this film.
   * @param ids List of character ids.
   */
  public fetchPeople(ids?: readonly number[]): Observable<Planet[]> {
    let charactersDocuments$: Observable<DocumentData[]>;
    if (ids != null) {
      charactersDocuments$ = this.firebaseService.fetchDocumentsDataByField(
        'people',
        'pk',
        ids,
      );
    } else {
      charactersDocuments$ = this.firebaseService.fetchDocumentsData('people');
    }
    return charactersDocuments$.pipe(
      map(characterDoc =>
        characterDoc.map(doc => this.planetMapper.fromDto(doc['data']()))),
    );
  }

  /**
   * Returns number of films.
   * @param options Pagination, sorting and filtering options.
   */
  public getCountFilms(options: TableOptions): Observable<number> {
    return this.firebaseService.getCountDocumentData(
      'films',
      options,
      Path.Fields,
    );
  }
}
