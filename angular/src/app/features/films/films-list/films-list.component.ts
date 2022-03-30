import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, combineLatest, debounceTime, fromEvent, map, Subject, switchMap, takeUntil } from 'rxjs';
import { Film } from 'src/app/core/models/film';
import { PaginationParameters } from 'src/app/core/models/pagination-parameters';
import { SortDirection } from 'src/app/core/models/sort-parameters';
import { FilmsService } from 'src/app/core/services/films.service';

/** Films list.*/
@Component({
  selector: 'sw-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent implements OnInit, AfterViewInit, OnDestroy {
  /** Films search input. */
  @ViewChild('searchInput') public searchInput?: ElementRef<HTMLInputElement>;

  /** Paginator. */
  @ViewChild('paginator') public paginator?: MatPaginator;

  /** Number of films per page.*/
  public readonly pageSize = 3;

  /** The set of provided page size options to display to the user. */
  public readonly pageSizeOptions = [this.pageSize, 5, 20];

  /** Films table column headings.*/
  public readonly displayedColumns: string[] = ['title', 'director', 'created'];

  private readonly searchOption$ = new BehaviorSubject('');

  private paginationOptions$ = new BehaviorSubject({
    length: 6,
    pageIndex: 0,
    pageSize: this.pageSize,
  } as PaginationParameters);

  private sortOptions$ = new BehaviorSubject({
    sortField: 'title',
    direction: SortDirection.Asc,
  });

  private tableOptions$ = combineLatest([this.paginationOptions$, this.sortOptions$, this.searchOption$]);

  private readonly destroy$: Subject<void> = new Subject();

  /** Number of films in the collection. */
  public length = this.tableOptions$.pipe(
    switchMap(([paginationOptions, sortOptions, searchOption]) =>
      this.filmsService.getCountFilms({ ...paginationOptions, ...sortOptions, searchValue: searchOption })),
  );

  /** Films.*/
  public films$ = this.tableOptions$.pipe(
    switchMap(([paginationOptions, sortOptions, searchOption]) =>
      this.filmsService.fetchFilms({ ...paginationOptions, ...sortOptions, searchValue: searchOption })),
  );

  public constructor(private readonly filmsService: FilmsService) { }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.length
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => {
        if (this.paginator) {
          this.paginator.length = v;
        }
        return v;
      });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /** @inheritdoc */
  public ngAfterViewInit(): void {
    if (this.searchInput) {
      fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
        map((i: Event) => (i.currentTarget as HTMLInputElement).value),
        debounceTime(500),
      )
        .pipe(takeUntil(this.destroy$))
        .subscribe(value => {
          this.searchOption$.next(value);
          if (this.paginator) {
            this.paginator.firstPage();
          }
        });
    }
  }

  /** Changing pagination parameters by the user.
   * @param event Change event object that is emitted when
   * the user selects a different page size or navigates to another page.
   */
  public changePaginationOptions(event: PageEvent): void {
    this.paginationOptions$.next({
      length: event.length,
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      previousPageIndex: event.previousPageIndex,
    });
  }

  /** Change sort options.
   * @param event Change event object that is emitted
   * when the user selects a different page size or navigates to another page.
   */
  public changeSortOptions(event: Sort): void {
    this.sortOptions$.next({
      sortField: event.active,
      direction: event.direction === 'desc' ? SortDirection.Desc : SortDirection.Asc,
    });
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  /** Film id.
   * @param _index Film index.
   * @param film Film.
   */
  public trackById(_index: number, film: Film): string {
    return film.id;
  }

}
