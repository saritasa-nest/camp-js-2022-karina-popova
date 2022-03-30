import { CharacterFieldDto } from './character-fields.dto';

/** DTO describing the character. */
export interface CharacterDto {

  /** Character id . */
  readonly id: string;

  /** Character pk . */
  readonly pk: number;

  /** Character information . */
  readonly fields: CharacterFieldDto;

}
