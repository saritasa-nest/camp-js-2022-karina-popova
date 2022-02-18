import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { __values } from 'tslib';

import { Film } from '../models/Film';

import { FilmMapper } from './mappers/Film.mapper';
import { FilmDTO } from './mappers/dto/Film/FilmDTO';

/**
 * Service.
 */
@Injectable({
  providedIn: 'root',
})
export class Service {

  /**
   * Service.
   */
  public refCollection: AngularFirestoreCollection<FilmDTO>;

  /**
   * @param firestore Service.
   * @param filmMapper Service.
   */
  public constructor(
    private firestore: AngularFirestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.refCollection = this.firestore.collection('films');
  }

  /**
   * Service.
   */
  public fetchFilms(): Observable<Film[]> {
    return this.refCollection.valueChanges().pipe(map(filmsDto => filmsDto.map(filmDto => this.filmMapper.fromDto(filmDto))));
  }

}
