import { Injectable } from '@angular/core';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

import { People } from '../models/people';

import { FirebaseService } from './firebase.service';
import { PeopleDto } from './mappers/dto/people/people.dto';
import { PeopleMapper } from './mappers/people.mapper';

/**
 * Character service.
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  public constructor(
    private readonly firebaseService: FirebaseService,
    private readonly characterMapper: PeopleMapper,
  ) { }

  /**
   * Fetch list of characters that are in this film.
   * @param ids List of character ids.
   */
  public fetchPeople(ids?: readonly number[]): Observable<People[]> {
    let charactersDocuments$: Observable<QueryDocumentSnapshot<unknown>[]>;
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
        characterDoc.map(doc => this.characterMapper.fromDto(doc.data() as PeopleDto))),
    );

  }
}
