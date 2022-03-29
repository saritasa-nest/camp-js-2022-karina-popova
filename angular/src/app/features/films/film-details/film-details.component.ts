import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';
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

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly characterService: CharacterService,
    private readonly planetService: PlanetService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.film$ = this.filmsService.fetchFilmById(this.filmId).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    this.planetNames$ = this.film$.pipe(
      filter(Boolean),
      switchMap(v => this.planetService.fetchPlanets(v.planets.slice(0, 9)).pipe(
        map(planets => planets.map(
          planet => planet.name,
        )),
      )),
    );
    this.peopleNames$ = this.film$.pipe(
      filter(Boolean),
      switchMap(v => this.characterService.fetchPeople(v.characters.slice(0, 9)).pipe(
        map(characters => characters.map(
          character => character.name,
        )),
      )),
    );
  }
}
