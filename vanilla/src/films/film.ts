/** Film.*/
export interface Film {

  /** Сollection document id .*/
  id: string;

  /** The date or string format of the time that this resource was created.*/
  created: Date;

  /** The name of the director of this film.*/
  director: string;

  /** The date format of the time that this resource was edited.*/
  edited: Date;

  /** The opening paragraphs at the beginning of this film.*/
  openingCrawl: string;

  /** The name(s) of the producer(s) of this film. Comma separated.*/
  producer: string;

  /** The date or string format of film release at original creator country.*/
  releaseDate: Date;

  /** The title of this film.*/
  title: string;
}
