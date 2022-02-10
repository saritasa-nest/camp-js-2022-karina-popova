import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

/** Store. */
export interface Store {

  /** Search query that used when searching. */
  searchText: string;

  /** Cursor of the last document of the page, used for pagination. */
  lastDocFilm: QueryDocumentSnapshot<DocumentData> | null;

  /** Cursor of the first document of the page, used for pagination. */
  firstDocFilm: QueryDocumentSnapshot<DocumentData> | null;
}

/** Store service. */
export class StoreService {
  private static _searchText = '';

  private static _lastDocFilm: QueryDocumentSnapshot<DocumentData> | null = null;

  private static _firstDocFilm: QueryDocumentSnapshot<DocumentData> | null = null;

  /** Get store object. */
  public static getStore(): Store {
    return {
      searchText: this._searchText,
      lastDocFilm: this._lastDocFilm,
      firstDocFilm: this._firstDocFilm,
    };
  }

  /**
   * Set store object.
   * @param store Partial store object to set.
   */
  public static setStore(store: Partial<Store>): void {
    this._searchText = store.searchText ?? this._searchText;
    this._lastDocFilm = store.lastDocFilm === null ? null : store.lastDocFilm ?? this._lastDocFilm;
    this._firstDocFilm = store.firstDocFilm === null ? null : store.firstDocFilm ?? this._firstDocFilm;
  }
}
