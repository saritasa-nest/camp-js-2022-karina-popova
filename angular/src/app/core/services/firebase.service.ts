import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import {
  AngularFirestore,
  CollectionReference,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';

import { CollectionPath, Path } from '../models/path';
import { QueryParameters } from '../models/query-parameters';

import DocumentData = firebase.firestore.DocumentData;

/**
 * Character to search for the first letters in the string.
 */
const SEARCH_SYMBOL = '~';

/**
 * Firebase service.
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  /** Last document on the page. */
  private lastDoc: QueryDocumentSnapshot<unknown> | null = null;

  /**  First document on the page. */
  private firstDoc: QueryDocumentSnapshot<unknown> | null = null;

  public constructor(private readonly firestore: AngularFirestore) {}

  /**
   * Fetch list of document data with pagination, filtering and sorting.
   * @param path Path to collection.
   * @param parameters Parameters for generating a query constraint.
   * @param pathField Path to a field with nested fields in the document data.
   */
  public fetchSortedDocumentsData(
    path: CollectionPath,
    parameters: QueryParameters,
    pathField: Path
  ): Observable<DocumentData[]> {
    return this.firestore
      .collection(path, refCollection =>
        this.getQueryConstraint(refCollection, parameters, pathField)
      )
      .snapshotChanges()
      .pipe(
        filter(documentsDto => documentsDto.length > 0),
        tap(documentsDto => {
          this.lastDoc = documentsDto[documentsDto.length - 1].payload.doc;
          this.firstDoc = documentsDto[0].payload.doc;
        }),
        map((documentsDto) => {
          return documentsDto.map((documentDto) => documentDto.payload.doc);
        })
      );
  }

  /**
   * Fetch list of document data.
   * @param path Path to collection.
   */
  public fetchDocumentsData(path: CollectionPath): Observable<DocumentData[]> {
    return this.firestore
      .collection(path)
      .snapshotChanges()
      .pipe(
        map(documentsDto =>
          documentsDto.map(documentDto => documentDto.payload.doc)
        )
      );
  }

  /**
   * Get a document data by id.
   * @param path Path to collection.
   * @param id Document id.
   */
  public fetchDocumentDataById(
    path: CollectionPath,
    id: string
  ): Observable<DocumentData> {
    return this.firestore
      .doc(`${path}/${id}`)
      .snapshotChanges()
      .pipe(map(documentDto => documentDto.payload));
  }

  /**
   * Fetch documents with specified field.
   * @param path Path to collection.
   * @param pathCompare The path to compare.
   * @param value The value for comparison.Array must be up to 10 elements.
   */
  public fetchDocumentsDataByField(
    path: CollectionPath,
    pathCompare: string,
    value: readonly number[]
  ): Observable<DocumentData[]> {
    return this.firestore
      .collection(path, refCollection =>
        refCollection.where(pathCompare, 'in', value)
      )
      .snapshotChanges()
      .pipe(
        map(documentsDto =>
          documentsDto.map(documentDto => documentDto.payload.doc)
        )
      );
  }

  /**
   * Returns a query, including filtering and sorting, pagination.
   * @param refCollection Link to collection.
   * @param parameters Parameters for generating a query constraint.
   * @param pathField Path to a field with nested fields in the document data.
   */
  private getQueryConstraint(
    refCollection: CollectionReference<DocumentData>,
    parameters: QueryParameters,
    pathField: Path
  ): firebase.firestore.Query<DocumentData> {
    const queryFilterSort = this.getQueryFilterSort(
      refCollection,
      parameters,
      pathField
    );
    if (
      parameters.previousPageIndex !== undefined &&
      parameters.pageIndex === 0
    ) {
      return queryFilterSort.limit(parameters.pageSize);
    }
    if (
      parameters.previousPageIndex !== undefined &&
      parameters.previousPageIndex < parameters.pageIndex
    ) {
      return queryFilterSort
        .startAfter(this.lastDoc)
        .limit(parameters.pageSize);
    }
    if (
      parameters.previousPageIndex !== undefined &&
      parameters.previousPageIndex > parameters.pageIndex
    ) {
      return queryFilterSort
        .limitToLast(parameters.pageSize)
        .endBefore(this.firstDoc);
    }
    return queryFilterSort.limit(parameters.pageSize);
  }

  /**
   * Returns a query including filtering and sorting.
   * @param refCollection Link to collection.
   * @param parameters Parameters for generating a query constraint.
   * @param pathField Path to a field with nested fields in the document data.
   */
  private getQueryFilterSort(
    refCollection: CollectionReference<DocumentData>,
    parameters: QueryParameters,
    pathField: Path
  ): firebase.firestore.Query<DocumentData> {
    if (parameters.direction === '') {
      parameters.direction = 'asc';
    }
    if (parameters.searchValue) {
      parameters.active = 'title';
    }
    if (
      parameters.direction &&
      parameters.previousPageIndex !== undefined &&
      parameters.searchValue
    ) {
      return refCollection
        .where(`${pathField}${parameters.active}`, '>=', parameters.searchValue)
        .where(
          `${pathField}${parameters.active}`,
          '<=',
          parameters.searchValue + SEARCH_SYMBOL
        )
        .orderBy(`${pathField}${parameters.active}`, parameters.direction);
    }
    return refCollection.orderBy(
      `${pathField}${parameters.active}`,
      parameters.direction
    );
  }

  /**
   * Returns number of documents in the collection.
   * @param path Path to collection.
   * @param parameters Pagination, sorting and filtering options.
   * @param pathField Path to a field with nested fields in the document data.
   */
  public getCountDocumentData(
    path: CollectionPath,
    parameters: QueryParameters,
    pathField: Path
  ): Observable<number> {
    return this.firestore
      .collection(path, refCollection =>
        this.getQueryFilterSort(refCollection, parameters, pathField)
      )
      .snapshotChanges()
      .pipe(map(documentsDto => documentsDto.length));
  }
}
