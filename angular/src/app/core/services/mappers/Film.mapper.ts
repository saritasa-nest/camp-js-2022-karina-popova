import { Injectable } from '@angular/core';

import { Film } from '../../models/Film';

import { FilmDTO } from './dto/Film/film.dto';
import { IMapperFromDto } from './mapper';

/** Film mapper. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper implements IMapperFromDto<FilmDTO, Film> {
  /** @inheritdoc */
  public fromDto(data: FilmDTO): Film {
    const { fields } = data;
    return {
      id: data.id,
      created: fields.created,
      director: fields.director,
      title: fields.title,
      edited: fields.edited,
      openingCrawl: fields.opening_crawl,
      producer: fields.producer,
      releaseDate: fields.release_date,
    };
  }
}
