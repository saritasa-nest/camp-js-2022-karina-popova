import { Character } from 'src/models/characters';

import { CharacterDto } from '../dtos/character/character.dto';

export namespace CharacterMapper {
  /** Character mapper.
   * @param fields Character dto.
   */
  export function fromDto({ fields }: CharacterDto): Character {
    return {
      name: fields.name,
    };
  }
}
