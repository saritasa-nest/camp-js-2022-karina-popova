import { Film } from 'src/models/film';
import { FilmDto } from '../dtos/film/film.dto';

export namespace FilmMapper {
  /** Maps dto to model.
   * @param data Film dto.
   */
  export function fromDto({ id, fields }: FilmDto): Film {
    return new Film(
      {
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
      },
    );
  }
}
