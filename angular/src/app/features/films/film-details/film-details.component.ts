import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmsService } from 'src/app/core/services/films.service';

/** Film. */
@Component({
  selector: 'sw-film-detail',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailsComponent {
  /** Film with details. */
  public readonly film$: Observable<Film | null>;

  /** Planet names. */
  public readonly planetNames$: Observable<string[]>;

  /** People names. */
  public readonly peopleNames$: Observable<string[]>;

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly route: Router,
  ) {
    this.film$ = this.filmsService.fetchFilmById(this.route.url);
    this.planetNames$ = this.filmsService.fetchFilmById(this.route.url).pipe(
      switchMap(v => this.filmsService.fetchPlanets(v.planets.slice(0, 9)).pipe(
        map(planets => planets.map(
          planet => planet.name,
        )),
      )),
    );
    this.peopleNames$ = this.filmsService.fetchFilmById(this.route.url).pipe(
      switchMap(v => this.filmsService.fetchPeople(v.characters.slice(0, 9)).pipe(
        map(characters => characters.map(
          character => character.name,
        )),
      )),
    );
  }
}
