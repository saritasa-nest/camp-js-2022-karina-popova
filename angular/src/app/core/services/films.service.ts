import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Film } from '../models/film';
import { Path } from '../models/pathFields';
import { Planet } from '../models/planet';
import { TableOptions } from '../models/table-options';

import { FirebaseService } from './firebase.service';
import { FilmDto } from './mappers/dto/film/film.dto';
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
  ) { }

  /**
   * List of films with pagination, filtering and sorting.
   * @param options Pagination, sorting and filtering options.
   */
  public fetchFilms(options: TableOptions): Observable<readonly Film[]> {
    return this.firebaseService.fetchDocumentsData('films', options, Path.Fields)
      .pipe(
        map(filmsDto => filmsDto.map(filmDto => {
          const data = filmDto['data']();
          const { id } = filmDto;
          return this.filmMapper.fromDto({ ...data, id });
        })),
      );
  }

  /**
   * Get a film by id.
   * @param id Film id.
   */
  public fetchFilmById(id: string): Observable<Film> {
    return this.firebaseService.fetchDocumentDataById('films', id)
      .pipe(
        map(filmDto => {
          const data = filmDto['data']();
          return this.filmMapper.fromDto({ ...data, id });
        }),
      );
  }

  /**
   * List of planets that are in this film.
   * @param id List of planet numbers.
   */
  public fetchPlanets(id: number[]): Observable<readonly Planet[]> {
    return this.firebaseService.fetchDocumentsDataByField('planets', 'pk', id).pipe(
      map(planetsDoc => planetsDoc.map(
        doc => {
          const data = doc['data']();
          return this.planetMapper.fromDto(data);
        },
      )),
    );
  }

  /**
   * List of characters that are in this film.
   * @param id List of character numbers.
   */
  public fetchPeople(id: number[]): Observable<Planet[]> {
    return this.firebaseService.fetchDocumentsDataByField('people', 'pk', id).pipe(
      map(peopleDoc => peopleDoc.map(
        doc => {
          const data = doc['data']();
          return this.planetMapper.fromDto(data);
        },
      )),
    );
  }

  /** Number of films.
   * @param options Pagination, sorting and filtering options.
   */
  public getCountFilms(options: TableOptions): Observable<number> {
    return this.firebaseService.getCountDocumentData('films', options, Path.Fields);
  }

  /** Deleting film.
   * @param id Film id.
   */
  public deleteFilm(id: string): void {
    this.firebaseService.deleteDocumentData(`films${id}`);
  }

  /**
   * Adding a document.
   * @param id Film id.
   * @param value Film.
   */
  public addFilm(id: string, value: FilmDto): void {
    this.firebaseService.addDocumentData(`films${id}`, value);
  }

  /**
   * Document editing.
   * @param id Film id.
   * @param value Film.
   */
  public editDocumentData(id: string, value: FilmDto): void {
    this.firebaseService.editDocumentData(`films${id}`, value);
  }
}
