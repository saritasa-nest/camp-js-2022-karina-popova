import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, Observable, shareReplay, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { CharacterService } from 'src/app/core/services/characters.service';
import { FilmsService } from 'src/app/core/services/films.service';
import { PlanetService } from 'src/app/core/services/planets.service';

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

  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly route: Router,
  ) {
    this.film$ = this.filmsService.fetchFilmById(this.activatedRoute.snapshot.paramMap.get('id') ?? '').pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );
    this.planetNames$ = this.film$.pipe(
      filter((film): film is Film => (film != null)),
      switchMap(v => this.planetService.fetchPlanets(v.planets).pipe(
        map(planets => planets.map(
          planet => planet.name,
        )),
      )),
    );
    this.peopleNames$ = this.film$.pipe(
      filter((film): film is Film => (film != null)),
      switchMap(v => this.characterService.fetchPeople(v.characters).pipe(
        map(characters => characters.map(
          character => character.name,
        )),
      )),
    );
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /** Button click. */
  public onClick(): void {
    if (this.filmId) {
      this.filmsService.deleteFilm(this.filmId)
        .pipe(
          first(),
          tap(() => this.route.navigate([''])),
          takeUntil(this.destroy$),
        )
        .subscribe()
    }
  }
}
