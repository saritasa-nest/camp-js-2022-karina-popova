import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Film } from '../models/Film';

import { FilmMapper } from './mappers/Film.mapper';
import { FilmDTO } from './mappers/dto/Film/film.dto';

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
    return this.refCollection.snapshotChanges().pipe(map(filmsDto => filmsDto.map(filmDto => {
        const data = filmDto.payload.doc.data() as FilmDTO;
        const { id } = filmDto.payload.doc;
        return this.filmMapper.fromDto({ ...data, id });
    })));
  }

}
