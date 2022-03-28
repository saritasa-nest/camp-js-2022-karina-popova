import { Immerable, OmitImmerable } from './immerable';

/** Film. */
export class Film extends Immerable {
  /** The date resource was created. */
  public created: Date;

  /** The name of the director of this film. */
  public director: string;

  /** The date resource was edited. */
  public edited: Date;

  /** The opening paragraphs at the beginning of this film. */
  public openingCrawl: string;

  /** The name(s) of the producer(s) of this film. */
  public producer: string[];

  /** The date release at original creator country. */
  public releaseDate: Date;

  /** The title of this film. */
  public title: string;

  /** Film id. */
  public id: string;

  /** The episode number of this film. */
  public episodeId: number;

  /** The keys of the planets in this film. */
  public planets: number[];

  /** People that are in this film. */
  public characters: number[];

  public constructor(data: FilmInitArgs) {
    super();
    this.created = data.created;
    this.director = data.director;
    this.edited = data.edited;
    this.openingCrawl = data.openingCrawl;
    this.producer = data.producer;
    this.releaseDate = data.releaseDate;
    this.title = data.title;
    this.id = data.id;
    this.episodeId = data.episodeId;
    this.planets = data.planets;
    this.characters = data.characters;
  }
}

type FilmInitArgs = OmitImmerable<Film>;
