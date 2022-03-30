import { FilmFieldsDto } from './film-fields.dto';

/**  DTO describing the film. */
export interface FilmDto {

  /** Film id . */
  readonly id: string;

  /** Film pk . */
  readonly pk: number;

  /** Film information . */
  readonly fields: FilmFieldsDto;
}
