import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFirestore, CollectionReference, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';

import { Path } from '../models/pathFields';
import { TableOptions } from '../models/table-options';

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

  /**
   * Character to search for the first letters in the string.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public SEARCH_SYMBOL = '~';

  public constructor(
    private readonly firestones: AngularFirestore,
  ) { }

  /**
   * List of document data with pagination, filtering and sorting.
   * @param path Path to collection.
   * @param options Pagination options.
   * @param pathField Path to a field with nested fields in the document data.
   */
  public fetchDocumentData(path: string, options: TableOptions, pathField: Path): Observable<readonly DocumentData[]> {
    return this.firestones.collection(path, refCollection => this.getQueryConstraint(refCollection, options, pathField))
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

  /** Returns a query, including filtering and sorting, pagination.
   * @param refCollection Link to collection.
   * @param options - Parameters for generating a query constraint.
   * @param pathField Path to a field with nested fields in the document data.
   */
  public getQueryConstraint(refCollection: CollectionReference<DocumentData>, options: TableOptions, pathField: Path):
    firebase.firestore.Query<DocumentData> {
    const queryFilterSort = this.getQueryFilterSort(refCollection, options, pathField);
    if (options.previousPageIndex !== undefined && options.pageIndex === 0) {
      return queryFilterSort.limit(options.pageSize);
    }
    if (options.previousPageIndex !== undefined && options.previousPageIndex < options.pageIndex) {
      return queryFilterSort
        .startAfter(this.lastDoc)
        .limit(options.pageSize);
    }
    if (options.previousPageIndex !== undefined && options.previousPageIndex > options.pageIndex) {
      return queryFilterSort
        .limitToLast(options.pageSize)
        .endBefore(this.firstDoc);

    }
    return queryFilterSort.limit(options.pageSize);
  }

  /** Returns a query including filtering and sorting.
   * @param refCollection Link to collection.
   * @param options - Parameters for generating a query constraint.
   * @param pathField Path to a field with nested fields in the document data.
   */
  public getQueryFilterSort(refCollection: CollectionReference<DocumentData>, options: TableOptions, pathField: Path):
    firebase.firestore.Query<DocumentData> {
    if (options.direction === '') {
      options.direction = 'asc';
    }
    if (options.searchValue) {
      options.active = 'title';
    }
    if (options.direction && options.previousPageIndex !== undefined && options.searchValue) {
      return refCollection
        .where(`${pathField}${options.active}`, '>=', options.searchValue)
        .where(`${pathField}${options.active}`, '<=', options.searchValue + this.SEARCH_SYMBOL)
        .orderBy(`${pathField}${options.active}`, options.direction);
    }
    return refCollection
      .orderBy(`${pathField}${options.active}`, options.direction);
  }

  /**
   * Number of documents in the collection.
   * @param path Path to collection.
   * @param options Pagination, sorting and filtering options.
   * @param pathField Path to a field with nested fields in the document data.
   */
  public getCountDocumentData(path: string, options: TableOptions, pathField: Path): Observable<number> {
    return this.firestones.collection(path, refCollection => this.getQueryFilterSort(refCollection, options, pathField)).snapshotChanges()
      .pipe(
        map(documentsDto => documentsDto.length),
      );
  }
}
