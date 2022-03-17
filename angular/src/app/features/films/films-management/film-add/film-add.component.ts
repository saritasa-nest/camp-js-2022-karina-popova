import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/core/services/films.service';

/** Create film. */
@Component({
  selector: 'sw-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmAddComponent {
  /** Form name. */
  public title = 'Add film';

  /** Form field controls. */
  public addForm = this.fb.group({
    title: ['', [Validators.required]],
    created: [new Date(), [Validators.required]],
    director: ['', [Validators.required]],
    openingCrawl: ['', [Validators.required]],
    episodeId: 6,
    planets: [[3, 2], Validators.required],
    characters: [[1, 2], Validators.required],
    edited: [new Date(), [Validators.required]],
    releaseDate: [new Date(), [Validators.required]],
    producer: ['', [Validators.required]],
  });

  public constructor(
    private readonly route: Router,
    private readonly filmsService: FilmsService,
    private readonly fb: FormBuilder,
  ) { }

  /** Submit form. */
  public submitForm(): void {
    this.filmsService.addFilm(this.addForm.value).then(
      () => this.route.navigate(['']),
    );
  }

  /** Close form. */
  public closeForm(): void {
    this.route.navigate(['']);
  }
}
