import { Injectable } from '@angular/core';

import { Planet } from '../../models/planet';

import { PlanetDto } from './dto/planet/planet.dto';

/** Planet mapper. */
@Injectable({
  providedIn: 'root',
})
export class PlanetMapper {
  /** @inheritdoc */
  public fromDto({ fields }: PlanetDto): Planet {
    return {
      name: fields.name,
    };
  }
}
