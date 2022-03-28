import { DocumentData } from 'firebase/firestore';
import { Film } from 'src/models/film';
import { SortDirection } from 'src/utils/enums';

/**
 * Films state.
 */
export interface FilmsState {
  /** Films. */
  readonly films: Film[];
  /** . */
  readonly lastFilmOnPage: DocumentData | null;
  /** . */
  readonly sort: SortDirection;
  /** . */
  readonly searchValue: string;
}
export const initialFilmsState: FilmsState = {
  films: [],
  lastFilmOnPage: null,
  sort: SortDirection.Asc,
  searchValue: '',
};
