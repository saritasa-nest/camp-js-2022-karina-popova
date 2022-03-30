import { Injectable } from '@angular/core';
import { DocumentReference, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { defer, map, Observable, tap } from 'rxjs';

import { Film } from '../models/film';
import { Path } from '../models/path';
import { QueryParameters } from '../models/query-parameters';

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
  private lastFilm: QueryDocumentSnapshot<unknown> | null = null;

  private firstFilm: QueryDocumentSnapshot<unknown> | null = null;

  public constructor(
    private readonly firebaseService: FirebaseService,
    private readonly filmMapper: FilmMapper,
  ) { }

  /**
   * Fetch list of films with pagination, filtering and sorting.
   * @param options Pagination, sorting and filtering options.
   */
  public fetchFilms(options: QueryParameters): Observable<Film[]> {
    return this.firebaseService
      .getSortedDocumentsData({
        path: 'films',
        parameters: options,
        pathField: Path.Fields,
        lastDoc: this.lastFilm,
        firstDoc: this.firstFilm,
      })
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

  /** Deleting film.
   * @param id Film id.
   */
  public deleteFilm(id: string): Observable<void> {
    return defer(() => this.firebaseService.deleteDocumentData(`films/${id}`));
  }

  /**
   * Adding a document.
   * @param value Film.
   */
  public addFilm(value: Film): Observable<DocumentReference<unknown>> {
    return defer(() => this.firebaseService.addDocumentData(`films`, this.filmMapper.toDto(value)));
  }

  /**
   * Document editing.
   * @param id Film id.
   * @param value Film.
   */
  public editFilm(id: string, value: Film): Observable<void> {
    return defer(() => this.firebaseService.editDocumentData(`films/${id}`, this.filmMapper.toDto(value)));
  }
}
