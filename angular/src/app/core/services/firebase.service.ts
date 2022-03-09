import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore, CollectionReference, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import DocumentData = firebase.firestore.DocumentData;

/**
 * Firebase service.
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  /** Last document on the page. */
  public lastDoc: QueryDocumentSnapshot<unknown> | null = null;

  /**  First document on the page. */
  public firstDoc: QueryDocumentSnapshot<unknown> | null = null;

  public constructor(
    private readonly firestore: AngularFirestore,
  ) {
  }

  /**
   * List of all document data.
   * @param path Path to collection.
   * @param _options Pagination options.
   */
  public fetchDocumentData(path: string, _options: PageEvent & Sort): Observable<readonly DocumentData[]> {
    return this.firestore.collection(path, refCollection => this.getQueryConstraint(refCollection, _options))
      .snapshotChanges()
      .pipe(
        map(documentsDto => {
          this.lastDoc = documentsDto[documentsDto.length - 1].payload.doc;
          this.firstDoc = documentsDto[0].payload.doc;
          return documentsDto.map(
            documentDto => documentDto.payload.doc,
          );
        }),
      );
  }

  /**
   * Returns the query limits, including filtering.
   * @param refCollection Link to collection.
   * @param _options - Parameters for generating a query constraint.
   */
  public getQueryConstraint(refCollection: CollectionReference<DocumentData>, _options: PageEvent & Sort):
    firebase.firestore.Query<DocumentData> {
    if (_options.direction && _options.previousPageIndex !== undefined) {
      if (_options.pageIndex === 0) {
        return refCollection
          .orderBy(`fields.${_options.active}`, _options.direction)
          .limit(_options.pageSize);
      }
      if (_options.previousPageIndex < _options.pageIndex) {
        return refCollection
          .orderBy(`fields.${_options.active}`, _options.direction)
          .startAfter(this.lastDoc)
          .limit(_options.pageSize);
      }
      if (_options.previousPageIndex > _options.pageIndex) {
        return refCollection
          .orderBy(`fields.${_options.active}`, _options.direction)
          .limitToLast(_options.pageSize)
          .endBefore(this.firstDoc);
      }
    }
    return refCollection
      .orderBy(`fields.${_options.active}`)
      .limit(_options.pageSize);

  }

  /**
   * Number of documents in the collection.
   * @param path Path to collection.
   */
  public getCountDocumentData(path: string): Observable<number> {
    return this.firestore.collection(path).snapshotChanges()
      .pipe(
        map(documentsDto => documentsDto.length),
      );
  }
}
