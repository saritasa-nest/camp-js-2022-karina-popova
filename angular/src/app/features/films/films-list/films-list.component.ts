import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
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
  /** Number of films per page.*/
  public pageSize = 1;

  /** The set of provided page size options to display to the user. */
  public pageSizeOptions = [this.pageSize, 5, 20];

  /** Number of films in the collection. */
  public length = this.filmsService.getCountFilms();

  /** Films table column headings.*/
  public displayedColumns: string[] = ['title', 'director', 'created'];

  public value = '';

  private paginationOptions$ = new BehaviorSubject({
    length: 6,
    pageIndex: 0,
    pageSize: this.pageSize,
    previousPageIndex: 0,
  } as PageEvent);

  private sortOptions$ = new BehaviorSubject({
    active: 'title',
    direction: 'asc',
  } as Sort);

  private allRenderOptions = combineLatest([this.paginationOptions$, this.sortOptions$]);

  /** Films.*/
  public films$ = this.allRenderOptions.pipe(
    switchMap(([paginationOptions, sortOptions]) =>
      this.filmsService.fetchFilms({ ...paginationOptions, ...sortOptions })),
  );

  public constructor(private readonly filmsService: FilmsService) { }

  /** Changing pagination parameters by the user.
   * @param event Change event object that is emitted when
   * the user selects a different page size or navigates to another page.
   */
  public changePaginationOptions(event: PageEvent): void {
    this.paginationOptions$.next(event);
    this.films$ = this.allRenderOptions.pipe(
      switchMap(([paginationOptions, sortOptions]) =>
        this.filmsService.fetchFilms({ ...paginationOptions, ...sortOptions })),
    );
  }

  /** Change sort options.
   * @param event Change event object that is emitted
   * when the user selects a different page size or navigates to another page.
   */
  public changeSortOptions(event: Sort): void {
    this.sortOptions$.next(event);
    this.films$ = this.allRenderOptions.pipe(
      switchMap(([paginationOptions, sortOptions]) =>
        this.filmsService.fetchFilms({ ...paginationOptions, ...sortOptions })),
    );
  }

  public changeSearchOptions(event: Event) {
    console.log(event);

  }

  /** Get a unique film id.
   * @param index Film index.
   * @param film Film.
   */
  public trackByFn(index: number, film: Film): string {
    return film.id;
  }
}
