import { DocumentData } from 'firebase/firestore';
import { Film } from 'src/models/film';
import { QueryParameters } from 'src/models/queryParameters';
import { DEFAULT_QUERY_PARAMETRS_FETCH_FILMS, DEFAULT_PATH_FILMS } from 'src/utils/constants';
import { FilmMapper } from '../mappers/film.mapper';
import { FirebaseService } from './firebase.service';

export namespace FilmService {
  /** Fetches films.
   * @param parameters Sorting, pagination and filtering options.
   */
  export async function fetchFilms(parameters: QueryParameters = DEFAULT_QUERY_PARAMETRS_FETCH_FILMS): Promise<{
    films: Film[];
    lastFilmOnPage: DocumentData | null;
  }> {
    const docs = await FirebaseService.fetchDocumentsData(parameters);
    return { films: docs.map(film => FilmMapper.fromDto({ id: film.id, ...film.data() })), lastFilmOnPage: docs[docs.length - 1] ?? null };
  }

  /** Fetches film by id.
   * @param id Film id.
   */
   export async function fetchFilmById(id: string): Promise<Film> {
    const film = await FirebaseService.fetchDocumentDataById(DEFAULT_PATH_FILMS, id);
    return FilmMapper.fromDto({ id: film.id, ...film.data() });
  }
}
