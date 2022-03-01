import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
export class FilmsListComponent implements OnInit {
  /** Films.*/
  @Input() public films$: Observable<Film[]>;

  /** Films table column headings.*/
  public displayedColumns: string[] = ['title', 'director', 'created'];

  public clickedRows = new Set<Film>();

  public constructor(private readonly service: Service) {
    this.films$ = this.service.fetchFilms();
  }

  public ngOnInit(): void {
  }
}
