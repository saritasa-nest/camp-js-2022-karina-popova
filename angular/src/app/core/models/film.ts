/** Film.*/
export interface Film {

  /** The date resource was created.*/
  readonly created: Date;

  /** The name of the director of this film.*/
  readonly director: string;

  /** The date resource was edited.*/
  readonly edited: Date;

  /** The opening paragraphs at the beginning of this film.*/
  readonly openingCrawl: string;

  /** The name(s) of the producer(s) of this film. */
  readonly producer: string[];

  /** The date release at original creator country.*/
  readonly releaseDate: Date;

  /** The title of this film.*/
  readonly title: string;

  /** Film id.*/
  readonly id: string;

  /** The episode number of this film. */
  readonly episodeId: number;

  /** The keys of the planets in this film. */
  readonly planets: readonly number[];

  /** People that are in this film. */
  readonly characters: readonly number[];
}
