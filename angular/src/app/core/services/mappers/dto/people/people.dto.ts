import { PeopleFieldDto } from './people-fields';

/** DTO describing the character.*/
export interface PeopleDto {

  /** Character id .*/
  readonly id: string;

  /** Character pk .*/
  readonly pk: number;

  /** Character information .*/
  readonly fields: PeopleFieldDto;

}
