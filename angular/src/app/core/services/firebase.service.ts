import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';

import DocumentData = firebase.firestore.DocumentData;

/**
 * Firebase service.
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  public constructor(
    private readonly firestore: AngularFirestore,
  ) {
  }

  /**
   * List of all document data.
   * @param path Path to collection.
   */
  public fetchDocumentData(path: string): Observable<readonly DocumentData[]> {
    return this.firestore.collection(path).snapshotChanges()
      .pipe(
        map(documentsDto => documentsDto.map(
          documentDto => documentDto.payload.doc,
        )),
      );
  }
}
