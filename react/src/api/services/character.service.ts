import { DocumentData } from 'firebase/firestore';
import { Character } from 'src/models/characters';
import { CharacterMapper } from '../mappers/characters.mapper';
import { FirebaseService } from './firebase.service';

export namespace CharacterService {
  /** Fetches characters.
   * @param ids .
   */
  export async function fetchCharacters(ids?: number[]): Promise<Character[]> {
    let docs: DocumentData[];
    if (ids != null) {
      docs = await FirebaseService.fetchDocumentDataByField('people', 'pk', ids);
    } else {
      docs = await FirebaseService.fetchDocumentsData('people');
    }
    return docs.map(character => CharacterMapper.fromDto({ id: character.id, ...character.data() }));
  }
}
