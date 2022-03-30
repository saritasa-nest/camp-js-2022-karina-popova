import { Planet } from '../../models/planet';

import { PlanetDto } from '../dtos/planet/planet.dto';

export namespace PlanetMapper {
  /** Planet mapper.
   * @param data Planet dto.
   */
  export function fromDto(data: PlanetDto): Planet {
    return {
      name: data.fields.name,
    };
  }
}
