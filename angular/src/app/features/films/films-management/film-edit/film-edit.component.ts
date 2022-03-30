import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmsService } from 'src/app/core/services/films.service';

/** Edit film. */
@Component({
  selector: 'sw-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmEditComponent implements AfterViewInit {
  /** Form name. */
  public title = 'Edit film';

  private readonly filmId =
    this.activatedRoute.snapshot.queryParamMap.get('id') ?? null;

  private readonly film$: Observable<Film> = new Observable();

  /** Form field controls. */
  public editForm = this.fb.group({
    title: ['', [Validators.required]],
    created: [new Date(), [Validators.required]],
    director: ['', [Validators.required]],
    edited: new Date(),
    releaseDate: new Date(),
    openingCrawl: ['', [Validators.required]],
    episodeId: 6,
    planets: [[3, 2], Validators.required],
    characters: [[1, 2], Validators.required],
    producer: '',
  });

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly route: Router,
    private readonly filmsService: FilmsService,
    private readonly fb: FormBuilder,
  ) {
    if (this.filmId) {
      this.film$ = this.filmsService.fetchFilmById(this.filmId);
    }
  }

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    this.film$.subscribe(value => {
      this.editForm.patchValue({
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
      );
    });
  }

  /** Submit form. */
  public submitForm(): void {
    if (this.filmId != null) {
      this.filmsService.editFilm(this.filmId, this.editForm.value).then(() => this.route.navigate(['']));
    }
  }

  /** Close form. */
  public closeForm(): void {
    this.route.navigate(['']);
  }
}
