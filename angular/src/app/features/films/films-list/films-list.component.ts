import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Film } from '../../../core/models/Film';

import { Service } from '../../../core/services/Firebase.service';

@Component({
  selector: 'sw-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent implements OnInit {

  @Input()
  public tableTitle = '';
  displayedColumns: string[] = ['Title', 'Director', 'Created'];

  public readonly films$: Observable<Film[]>;

  public constructor(service: Service) {
    this.films$ = service.fetchFilms();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
  }
}
