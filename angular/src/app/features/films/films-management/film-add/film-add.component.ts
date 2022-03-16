import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Film } from 'src/app/core/models/film';
import { FilmsService } from 'src/app/core/services/films.service';

/** Create film. */
@Component({
  selector: 'sw-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmAddComponent {
  /** Form field controls. */
  public addForm = this.fb.group({
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
    private readonly route: Router,
    private readonly filmsService: FilmsService,
    private readonly fb: FormBuilder,
  ) { }

  /** Submit form.
   * @param value Film information.
   */
  public submitForm(value: Film): void {
    this.filmsService.addFilm(value).then(
      () => this.route.navigate(['']),
    );
  }

  /** Close form. */
  public closeForm(): void {
    this.route.navigate(['']);
  }
}
