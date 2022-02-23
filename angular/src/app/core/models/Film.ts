/** Film.*/
export interface Film {

  /** The date resource was created.*/
  readonly created: string;

  /** The name of the director of this film.*/
  readonly director: string;

  /** The date resource was edited.*/
  readonly edited: string;

  /** The opening paragraphs at the beginning of this film.*/
  readonly openingCrawl: string;

  /** The name(s) of the producer(s) of this film. Comma separated.*/
  readonly producer: string;

  /** The date release at original creator country.*/
  readonly releaseDate: string;

  /** The title of this film.*/
  readonly title: string;

  /** Film id.*/
  readonly id: string;
}
