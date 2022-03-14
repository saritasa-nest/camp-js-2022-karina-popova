import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from 'src/app/core/services/films.service';

/** Films management. */
@Component({
  selector: 'sw-films-management',
  templateUrl: './films-management.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsManagementComponent {
  public constructor(
    private readonly filmService: FilmsService,
    private readonly route: Router,
  ) {}

  /** Button click. */
  public onClick(): void {
    this.filmService.deleteFilm(this.route.url);
  }
}
