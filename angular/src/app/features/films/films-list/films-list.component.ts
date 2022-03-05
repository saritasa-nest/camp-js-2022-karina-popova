import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Film } from 'src/app/core/models/film';

import { FilmsService } from 'src/app/core/services/Films.service';

/** Films list.*/
@Component({
  selector: 'sw-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent {
  /** Films table name.*/
  public readonly tableTitle = 'Films';

  /** Films.*/
  public films$ = this.filmsService.fetchFilms();

  public constructor(private readonly filmsService: FilmsService) {}

  /** Get a unique film id.
   * @param index Film index.
   * @param film Film.
   */
  public trackByFn(index: number, film: Film): string {
    return film.id;
  }
}
