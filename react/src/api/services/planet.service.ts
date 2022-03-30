import { DocumentData } from 'firebase/firestore';
import { Planet } from 'src/models/planet';
import { PlanetMapper } from '../mappers/planet.mapper';
import { FirebaseService } from './firebase.service';

export namespace PlanetService {
  /** Fetches planets.
   * @param ids .
   */
  export async function fetchPlanets(ids?: number[]): Promise<Planet[]> {
    let docs: DocumentData[];
    if (ids != null) {
      docs = await FirebaseService.fetchDocumentDataByField('planets', 'pk', ids);
    } else {
      docs = await FirebaseService.fetchDocumentsData('planets');
    }
    return docs.map(planet => PlanetMapper.fromDto({ id: planet.id, ...planet.data() }));
  }
}
