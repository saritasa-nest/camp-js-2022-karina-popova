import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Film } from '../../../core/models/Film';

import { Service } from '../../../core/services/Firebase.service';

/** Films list.*/
@Component({
  selector: 'sw-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent {
  /** Films table name.*/
  public tableTitle = 'Films';

  /** Films.*/
  public readonly films$: Observable<Film[]>;

  public constructor(private readonly service: Service) {
    this.films$ = this.service.fetchFilms();
  }
}
