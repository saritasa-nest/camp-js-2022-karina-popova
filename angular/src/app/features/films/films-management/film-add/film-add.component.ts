import { Component, ChangeDetectionStrategy, ViewChild, OnInit, AfterContentInit, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { FilmsService } from 'src/app/core/services/films.service';

import { FilmsManagementComponent } from '../films-management.component';

/** Create film. */
@Component({
  selector: 'sw-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmAddComponent implements AfterViewInit {

  /** Films management component. */
  @ViewChild(FilmsManagementComponent)
  public filmsManagement!: FilmsManagementComponent;

  public constructor(
    private readonly route: Router,
    private readonly filmsService: FilmsService,
  ) { }

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    this.filmsManagement.filmForm.patchValue({
      episodeId: 6,
    }, { onlySelf: false });
  }

  /** Submit form.
   * @param value Film information.
   */
  public submitForm(value: Film): void {
    this.filmsService.addFilm(value).then(
      () => this.route.navigate(['']),
    );
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
