/** Film.*/
export interface Film {

  /** Сollection document id .*/
  readonly id: string;

  /** The date or string format of the time that this resource was created.*/
  readonly created: Date;

  /** The name of the director of this film.*/
  readonly director: string;

  /** The date format of the time that this resource was edited.*/
  readonly edited: Date;

  /** The opening paragraphs at the beginning of this film.*/
  readonly openingCrawl: string;

  /** The name(s) of the producer(s) of this film. Comma separated.*/
  readonly producer: string;

  /** The date or string format of film release at original creator country.*/
  readonly releaseDate: Date;

  /** The title of this film.*/
  readonly title: string;
}
