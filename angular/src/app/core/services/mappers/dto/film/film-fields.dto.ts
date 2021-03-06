/**  DTO describing film fields.*/
export interface FilmFieldsDto {

  /** The date resource was created.*/
  readonly created: string;

  /** The name of the director of this film.*/
  readonly director: string;

  /** The date resource was edited.*/
  readonly edited: string;

  /** The opening paragraphs at the beginning of this film.*/
  readonly opening_crawl: string;

  /** The name(s) of the producer(s) of this film. Comma separated.*/
  readonly producer: string;

  /** The date release at original creator country.*/
  readonly release_date: string;

  /** The title of this film.*/
  readonly title: string;

  /** The episode number of this film. */
  readonly episode_id: number;

  /** Array of planet keys from this film. */
  readonly planets: readonly number[];

  /** People that are in this film. */
  readonly characters: readonly number[];
}
