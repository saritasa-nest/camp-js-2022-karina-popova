import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
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
