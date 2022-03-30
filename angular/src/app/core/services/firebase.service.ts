import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import {
  AngularFirestore,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';

import { CollectionPath, Path } from '../models/path';
import { QueryParameters } from '../models/query-parameters';

import DocumentData = firebase.firestore.DocumentData;

interface ParametersReceivingData {

  /** Path  to collection. */
  path: CollectionPath;

  /** Parameters for generating a query constraint. */
  parameters: QueryParameters;

  /** Path to a field with nested fields in the document data. */
  pathField: Path;

  /** Last document in previous request. */
  lastDoc: QueryDocumentSnapshot<unknown> | null;

  /** First document in previous request. */
  firstDoc: QueryDocumentSnapshot<unknown> | null;
}

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

  public constructor(private readonly firestore: AngularFirestore) { }

  /**
   * Get list of document data with pagination, filtering and sorting.
   * @param parametersReceivingData Parameters for getting data.
   */
  public getSortedDocumentsData({
    path,
    parameters,
    pathField,
    lastDoc,
    firstDoc,
  }: ParametersReceivingData): Observable<QueryDocumentSnapshot<unknown>[]> {
    return this.firestore
      .collection(path, refCollection =>
        this.getQueryConstraint(refCollection, parameters, pathField, lastDoc, firstDoc))
      .snapshotChanges()
      .pipe(
        map(documentsDto => {
          if (documentsDto.length !== 0) {
            return documentsDto.map(documentDto => documentDto.payload.doc);
          }
          return [];
        }),
      );
  }

  /**
   * Fetch list of document data.
   * @param path Path to collection.
   */
  public fetchDocumentsData(path: CollectionPath): Observable<QueryDocumentSnapshot<unknown>[]> {
    return this.firestore
      .collection(path)
      .snapshotChanges()
      .pipe(
        map(documentsDto => documentsDto.map(documentDto => documentDto.payload.doc)),
      );
  }

  /**
   * Get a document data by id.
   * Fetch list of document data.
   * @param path Path to collection.
   */
  public fetchDocumentDataById(
    path: CollectionPath,
    id: string,
  ): Observable<DocumentSnapshot<unknown>> {
    return this.firestore
      .doc(`${path}/${id}`)
      .snapshotChanges()
      .pipe(map(documentDto => documentDto.payload));
  }

  /**
   * Fetch documents with specified field.
   * @param path Path to collection.
   * @param pathCompare The path to compare.
   * @param value The value for comparison.
   */
  public fetchDocumentsDataByField(
    path: CollectionPath,
    pathCompare: string,
    value: readonly number[],
  ): Observable<QueryDocumentSnapshot<unknown>[]> {
    const observables = [];
    for (let i = 0; i < value.length; i += 10) {
      const queryDocumentSnapshot$ = this.firestore
        .collection(path, refCollection =>
          refCollection.where(pathCompare, 'in', value.slice(i, i + 10)))
        .snapshotChanges()
        .pipe(
          map(documentsDto =>
            documentsDto.map(documentDto => documentDto.payload.doc)),
        );
      observables.push(queryDocumentSnapshot$);
    }
    return combineLatest(observables).pipe(map(qs => qs.flat()));
  }

  /**
   * Returns a query, including filtering and sorting, pagination.
   * @param refCollection Link to collection.
   * @param parameters Parameters for generating a query constraint.
   * @param pathField Path to a field with nested fields in the document data.
   * @param lastDoc QueryDocumentSnapshot<unknown> | null.
   * @param firstDoc QueryDocumentSnapshot<unknown> | null.
   */
  private getQueryConstraint(
    refCollection: CollectionReference<DocumentData>,
    parameters: QueryParameters,
    pathField: Path,
    lastDoc: QueryDocumentSnapshot<unknown> | null,
    firstDoc: QueryDocumentSnapshot<unknown> | null,
  ): firebase.firestore.Query<DocumentData> {
    const queryFilterSort = this.getQueryFilterSort(
      refCollection,
      parameters,
      pathField,
    );
    if (parameters.pageIndex === 0) {
      return queryFilterSort.limit(parameters.pageSize);
    }
    if (parameters.previousPageIndex != null && parameters.previousPageIndex < parameters.pageIndex) {
      return queryFilterSort
        .startAfter(lastDoc)
        .limit(parameters.pageSize);
    }
    if (parameters.previousPageIndex != null && parameters.previousPageIndex > parameters.pageIndex) {
      return queryFilterSort
        .limitToLast(parameters.pageSize)
        .endBefore(firstDoc);
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
    pathField: Path,
  ): firebase.firestore.Query<DocumentData> {
    if (parameters.searchValue) {
      parameters.sortField = 'title';
    }
    if (parameters.direction && parameters.searchValue) {
      return refCollection
        .where(`${pathField}${parameters.sortField}`, '>=', parameters.searchValue)
        .where(
          `${pathField}${parameters.sortField}`,
          '<=',
          parameters.searchValue + SEARCH_SYMBOL,
        )
        .orderBy(`${pathField}${parameters.sortField}`, parameters.direction);
    }
    return refCollection.orderBy(
      `${pathField}${parameters.sortField}`,
      parameters.direction,
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
    pathField: Path,
  ): Observable<number> {
    return this.firestore
      .collection(path, refCollection =>
        this.getQueryFilterSort(refCollection, parameters, pathField))
      .snapshotChanges()
      .pipe(map(documentsDto => documentsDto.length));
  }

  /**
   * Deleting a document.
   * @param path Path to document.
   */
  public deleteDocumentData(path: string): Promise<void> {
    return this.firestore.doc(path).delete();
  }

  /**
   * Adding a document.
   * @param path Path to collection.
   * @param value Document data.
   */
  public addDocumentData(path: string, value: unknown): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(path).add(value);
  }

  /**
   * Document editing.
   * @param path Path to document.
   * @param value Document data.
   */
  public editDocumentData(path: string, value: Partial<unknown>): Promise<void> {
    return this.firestore.doc(path).update(value);
  }
}
