import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

import { Planet } from '../models/planet';

import { FirebaseService } from './firebase.service';
import { PlanetDto } from './mappers/dto/planet/planet.dto';
import { PlanetMapper } from './mappers/planet.mapper';

/**
 * Planet service.
 */
@Injectable({
  providedIn: 'root',
})
export class PlanetService {

  public constructor(
    private readonly firebaseService: FirebaseService,
    private readonly planetMapper: PlanetMapper,
  ) { }

  /**
   * Fetch list of planets that are in this film.
   * @param ids List of planet ids.
   */
  public fetchPlanets(ids?: readonly number[]): Observable<Planet[]> {
    let planetsDocuments$: Observable<QueryDocumentSnapshot<unknown>[]>;
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
        planetsDoc.map(doc => this.planetMapper.fromDto(doc.data() as PlanetDto))),
    );
  }

}
