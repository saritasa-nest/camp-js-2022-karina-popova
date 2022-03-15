/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';

import { Film } from '../../models/film';

import { FilmFieldsDto } from './dto/film/film-fields.dto';

import { FilmDto } from './dto/film/film.dto';

/** Film mapper. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper {
  /** @inheritdoc */
  public fromDto({ id, fields }: FilmDto): Film {
    return {
      id,
      created: new Date(fields.created),
      director: fields.director,
      title: fields.title,
      edited: new Date(fields.edited),
      openingCrawl: fields.opening_crawl,
      producer: fields.producer.split(','),
      releaseDate: new Date(fields.release_date),
      episodeId: fields.episode_id,
      planets: fields.planets,
      characters: fields.characters,
    };
  }

  /** @inheritdoc */
  public toDto(fields: Film): FilmFieldsDto {
    return {
      created: fields.created.toDateString(),
      director: fields.director,
      title: fields.title,
      edited: fields.edited.toDateString(),
      opening_crawl: fields.openingCrawl,
      producer: fields.producer.join(','),
      release_date: fields.releaseDate.toDateString(),
      episode_id: fields.episodeId,
      planets: fields.planets,
      characters: fields.characters,
    };
  }
}
