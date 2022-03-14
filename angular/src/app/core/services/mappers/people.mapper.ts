import { Injectable } from '@angular/core';

import { People } from '../../models/people';

import { PeopleDto } from './dto/people/people.dto';

/** People mapper. */
@Injectable({
  providedIn: 'root',
})
export class PeopleMapper {
  /** @inheritdoc */
  public fromDto({ fields }: PeopleDto): People {
    return {
      name: fields.name,
    };
  }
}
