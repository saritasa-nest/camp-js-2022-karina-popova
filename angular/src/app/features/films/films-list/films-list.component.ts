import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Film } from 'src/app/core/models/film';

import { FilmsService } from 'src/app/core/services/films.service';

/** Films list.*/
@Component({
  selector: 'sw-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent {
  /** Films.*/
  public films$ = this.filmsService.fetchFilms();

  /** Number of films per page.*/
  public pageSize = 1;

  /** The set of provided page size options to display to the user. */
  public pageSizeOptions = [this.pageSize, 5, 20];

  /** Number of films in the collection. */
  // public length: Observable<number>;

  /** Films table column headings.*/
  public displayedColumns: string[] = ['title', 'director', 'created'];

  public constructor(private readonly filmsService: FilmsService) {
    // this.length = this.filmsService.getLengthCollection();
  }

  /** Changing pagination parameters by the user.
   * @param event Change event object that is emitted when
   * the user selects a different page size or navigates to another page.
   */
  public changePaginationOptions(event: PageEvent): void {
    const { pageSize } = event;
    if (this.pageSize !== pageSize) {
      this.pageSize = pageSize;

      // this.films$ = this.filmsService.fetchFilms(this.pageSize);
      return;
    }
    if (event.previousPageIndex !== undefined && event.previousPageIndex < event.pageIndex) {
      // this.films$ = this.filmsService.nextPage(pageSize);
    } else {
      // this.films$ = this.filmsService.prevPage(pageSize);
    }

  }

  public trackByFn(index: number, film: Film): string {
    return film.id;
  }
}
