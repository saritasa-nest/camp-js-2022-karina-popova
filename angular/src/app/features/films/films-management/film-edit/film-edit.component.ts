import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmsService } from 'src/app/core/services/films.service';

import { FilmsManagementComponent } from '../films-management.component';

/** Edit film. */
@Component({
  selector: 'sw-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmEditComponent implements AfterViewInit {
  /** Films management component. */
  @ViewChild(FilmsManagementComponent)
  public readonly filmsManagement!: FilmsManagementComponent;

  private readonly filmId =
    this.activatedRoute.snapshot.queryParamMap.get('id') ?? null;

  private readonly film$: Observable<Film> = new Observable();

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly route: Router,
    private readonly filmsService: FilmsService,
  ) {
    if (this.filmId) {
      this.film$ = this.filmsService.fetchFilmById(this.filmId);
    }
  }

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    this.film$.subscribe(value => {
      this.filmsManagement.filmForm.patchValue(
        {
          created: value.created,
          director: value.director,
          edited: value.edited,
          openingCrawl: value.openingCrawl,
          producer: value.producer.toLocaleString(),
          releaseDate: value.releaseDate,
          title: value.title,
          planets: value.planets,
          characters: value.characters,
          episodeId: value.episodeId,
        },
        { onlySelf: false },
      );
    });
  }

  /** Submit form.
   * @param value Film information.
   */
  public submitForm(value: Film): void {
    if (this.filmId) {
      this.filmsService.editFilm(this.filmId, value).then(() => this.route.navigate(['']));
    }
  }

  /** Close form. */
  public closeForm(): void {
    this.route.navigate(['']);
  }
}
