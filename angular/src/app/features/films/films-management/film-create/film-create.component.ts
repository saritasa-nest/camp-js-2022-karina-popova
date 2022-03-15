import { Component, ChangeDetectionStrategy, ViewChild, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmsService } from 'src/app/core/services/films.service';

import { FilmsManagementComponent } from '../films-management.component';

/** Create film. */
@Component({
  selector: 'sw-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCreateComponent implements AfterViewInit {

  /**  */
  @ViewChild(FilmsManagementComponent)
  public filmsManagement!: FilmsManagementComponent;

  public constructor(
    private readonly route: Router,
    private readonly filmsService: FilmsService,
  ) {
  }

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    this.filmsManagement.filmForm.patchValue({
      episodeId: 3,
    }, { onlySelf: false });
  }

  /** Submit form.
   * @param value Film information.
   */
  public submitForm(value: Film): void {
    console.log(value);
    this.filmsService.addFilm(value);
  }

  public closeForm(): void {
    this.route.navigate(['']);
  }
}

// /** Form field validator. */
// @Input()
// public filmForm: FormGroup = this.fb.group({
//   title: ['', [Validators.required]],
// });

// private filmId = this.route.queryParams.pipe(map(v => v[0]));

// public constructor(
//   private readonly fb: FormBuilder,
//   private readonly dialog: MatDialog,
//   private readonly filmsService: FilmsService,
//   private readonly route: ActivatedRoute,
// ) {
//   this.route.queryParams.pipe(map(v => v[0]));
// }

// /** Submit form.
//  * @param value Film information.
//  */
// public submitForm(value: Film): void {
//   this.filmId.pipe(map(id => this.filmsService.addFilm(id, value)));
// }
