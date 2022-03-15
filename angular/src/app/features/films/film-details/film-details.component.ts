import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmsService } from 'src/app/core/services/films.service';

import { FilmCreateComponent } from '../films-management/film-create/film-create.component';

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
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) {
    // this.route.paramMap.pipe(
    //   map(params => params.get('id') ?? ''),
    //   switchMap(id => this.filmsService.fetchFilmById(id)),
    // );

    this.film$ = this.filmsService.fetchFilmById(this.route.snapshot.paramMap.get('id') ?? '').pipe(
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
    this.filmsService.deleteFilm(this.route.snapshot.paramMap.get('id') ?? '');
  }
}
