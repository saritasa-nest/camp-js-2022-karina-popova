import { PlanetFieldDto } from './planet-fields.dto';

/** DTO describing the planet. */
export interface PlanetDto {

  /** Planet id . */
  readonly id: string;

  /** Planet pk . */
  readonly pk: number;

  /** Planet information . */
  readonly fields: PlanetFieldDto;

}
