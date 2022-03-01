import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

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

  /**
   * Firestore collection link.
   */
  public refCollection: AngularFirestoreCollection<FilmDTO>;

  public constructor(
    private readonly firestore: AngularFirestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.refCollection = this.firestore.collection('films');
  }

  /**
   * List of all films with information.
   */
  public fetchFilms(): Observable<Film[]> {
    return this.refCollection.snapshotChanges().pipe(map(filmsDto => filmsDto.map(filmDto => {
        const data = filmDto.payload.doc.data() as FilmDTO;
        const { id } = filmDto.payload.doc;
        return this.filmMapper.fromDto({ ...data, id });
    })));
  }

}
