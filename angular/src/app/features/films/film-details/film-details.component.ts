import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { Planet } from 'src/app/core/models/planet';
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

  /** Planets. */
  public readonly planetsName$: Observable<string[]>;

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly route: Router,
  ) {
    this.film$ = this.filmsService.fetchFilmById(this.route.url);
    this.planetsName$ = this.filmsService.fetchFilmById(this.route.url).pipe(
      switchMap(v => this.filmsService.fetchPlanets(v.planets).pipe(
        map(planets => planets.map(
          planet => planet.name,
        )),
      )),
    );
  }
}
