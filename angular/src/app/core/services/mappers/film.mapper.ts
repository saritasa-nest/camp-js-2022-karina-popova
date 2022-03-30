import { Injectable } from '@angular/core';

import { Film } from '../../models/film';

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
  public toDto(fields: Film): Omit<FilmDto, 'id' | 'pk'> {
    return {
      fields: {
        created: fields.created?.toDateString(),
        director: fields.director,
        title: fields.title,
        edited: fields.edited?.toDateString(),
        release_date: fields.releaseDate?.toDateString(),
        opening_crawl: fields.openingCrawl,
        producer: fields.producer?.toString(),
        episode_id: fields.episodeId,
        planets: fields.planets,
        characters: fields.characters,
      },
    };
  }
}
