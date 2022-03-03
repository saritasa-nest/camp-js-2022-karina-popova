import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';

import { Film } from '../models/Film';

import { FilmMapper } from './mappers/Film.mapper';
import { FilmDTO } from './mappers/dto/Film/film.dto';

/**
 * Firebase service.
 */
@Injectable({
  providedIn: 'root',
})
export class Service {

  /**  */
  public lastDocFilm: QueryDocumentSnapshot<unknown> | null = null;

  /**  */
  public firstDocFilm: QueryDocumentSnapshot<unknown> | null = null;

  public constructor(
    private readonly firestore: AngularFirestore,
    private readonly filmMapper: FilmMapper,
  ) {
  }

  /**
   * List of all films with information.
   * @param limit Number of films per page.
   * @param paginationDirection Page switching direction.
   */
  public fetchFilms(limit: number): Observable<Film[]> {
    return this.firestore.collection('films', refCollection => refCollection.limit(limit)).snapshotChanges()
      .pipe(
        map(filmsDto => {
          this.lastDocFilm = filmsDto[filmsDto.length - 1].payload.doc;
          return filmsDto.map(filmDto => {
            const data = filmDto.payload.doc.data() as FilmDTO;
            const { id } = filmDto.payload.doc;
            return this.filmMapper.fromDto({ ...data, id });
          });
        }),
      );

  }

  /** Number of films in the collection. */
  public getLengthCollection(): Observable<number> {
    return this.firestore.collection('films').snapshotChanges()
      .pipe(map(filmsDto => filmsDto.length));
  }

  /**  */
  public nextPage(limit: number): Observable<Film[]> {
    return this.firestore.collection('films', refCollection => refCollection.startAfter(this.lastDocFilm).limit(limit)).snapshotChanges()
      .pipe(
        map(filmsDto => {
          this.lastDocFilm = filmsDto[filmsDto.length - 1].payload.doc;
          this.firstDocFilm = filmsDto[0].payload.doc;
          return filmsDto.map(filmDto => {
            const data = filmDto.payload.doc.data() as FilmDTO;
            const { id } = filmDto.payload.doc;
            return this.filmMapper.fromDto({ ...data, id });
          });
        }),
      );
  }

  /**  */
  public prevPage(limit: number): Observable<Film[]> {
    return this.firestore.collection('films', refCollection =>
      refCollection.orderBy('pk').limitToLast(limit)
        .endBefore(this.firstDocFilm)).snapshotChanges()
      .pipe(
        map(filmsDto => {
          this.lastDocFilm = filmsDto[filmsDto.length - 1].payload.doc;
          this.firstDocFilm = filmsDto[0].payload.doc;
          return filmsDto.map(filmDto => {
            const data = filmDto.payload.doc.data() as FilmDTO;
            const { id } = filmDto.payload.doc;
            return this.filmMapper.fromDto({ ...data, id });
          });
        }),
      );
  }
}
