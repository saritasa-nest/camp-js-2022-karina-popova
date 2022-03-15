import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';
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
  public readonly planetNames$: Observable<string[] | null>;

  /** People names. */
  public readonly peopleNames$: Observable<string[] | null>;

  private readonly filmId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly route: Router,
  ) {
    this.film$ = this.filmsService.fetchFilmById(this.activatedRoute.snapshot.paramMap.get('id') ?? '').pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );
    this.planetNames$ = this.film$.pipe(
      filter(Boolean),
      switchMap(v => this.filmsService.fetchPlanets(v.planets.slice(0, 9)).pipe(
        map(planets => planets.map(
          planet => planet.name,
        )),
      )),
    );
    this.peopleNames$ = this.film$.pipe(
      filter(Boolean),
      switchMap(v => this.filmsService.fetchPeople(v.characters.slice(0, 9)).pipe(
        map(characters => characters.map(
          character => character.name,
        )),
      )),
    );
  }

  /** Button click. */
  public onClick(): void {
    if (this.filmId) {
      this.filmsService.deleteFilm(this.filmId).then(
        () => this.route.navigate(['']),
      );
    }
  }
}
