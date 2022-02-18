import { Injectable } from '@angular/core';

import { Film } from '../../models/Film';

import { FilmDTO } from './dto/Film/FilmDTO';
import { IMapperFromDto } from './mapper';

@Injectable({
  providedIn: 'root',
})
export class FilmMapper implements IMapperFromDto<FilmDTO, Film> {

  public fromDto(data: FilmDTO): Film {
    const { fields } = data;
    return {
      created: new Date(fields.created),
      director: fields.director,
      title: fields.title,
      edited: new Date(fields.edited),
      openingCrawl: fields.opening_crawl,
      producer: fields.producer,
      releaseDate: new Date(fields.release_date),
    };
  }
}
