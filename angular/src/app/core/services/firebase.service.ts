import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import {
  AngularFirestore,
  CollectionReference,
  DocumentSnapshot,
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

  public constructor(private readonly firestore: AngularFirestore) { }

  /**
   * Fetch list of document data with pagination, filtering and sorting.
   * @param path Path to collection.
   * @param parameters Parameters for generating a query constraint.
   * @param pathField Path to a field with nested fields in the document data.
   * @param lastDoc Last document in previous request.
   * @param firstDoc First document in previous request.
   */
  public fetchSortedDocumentsData(
    path: CollectionPath,
    parameters: QueryParameters,
    pathField: Path,
    lastDoc: QueryDocumentSnapshot<unknown> | null,
    firstDoc: QueryDocumentSnapshot<unknown> | null,
  ): Observable<QueryDocumentSnapshot<unknown>[]> {
    return this.firestore
      .collection(path, refCollection =>
        this.getQueryConstraint(refCollection, parameters, pathField, lastDoc, firstDoc))
      .snapshotChanges()
      .pipe(
        filter(documentsDto => documentsDto.length > 0),
        map(documentsDto => documentsDto.map(documentDto => documentDto.payload.doc)),
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
        map(documentsDto =>
          documentsDto.map(documentDto => documentDto.payload.doc)),
      );
  }

  /**
   * Get a document data by id.
   * @param path Path to collection.
   * @param id Document id.
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
   * @param value The value for comparison.Array must be up to 10 elements.
   */
  public fetchDocumentsDataByField(
    path: CollectionPath,
    pathCompare: string,
    value: readonly number[],
  ): Observable<QueryDocumentSnapshot<unknown>[]> {
    return this.firestore
      .collection(path, refCollection =>
        refCollection.where(pathCompare, 'in', value))
      .snapshotChanges()
      .pipe(
        map(documentsDto =>
          documentsDto.map(documentDto => documentDto.payload.doc)),
      );
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
    if (parameters.previousPageIndex < parameters.pageIndex) {
      return queryFilterSort
        .startAfter(lastDoc)
        .limit(parameters.pageSize);
    }
    if (parameters.previousPageIndex > parameters.pageIndex) {
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
}
