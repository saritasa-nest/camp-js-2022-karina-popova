/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, combineLatest, debounceTime, fromEvent, map, Subject, switchMap, takeUntil } from 'rxjs';
import { Film } from 'src/app/core/models/film';

import { FilmsService } from 'src/app/core/services/films.service';

/** Films list.*/
@Component({
  selector: 'sw-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent implements AfterViewInit, OnDestroy {
  /** Films search input. */
  @ViewChild('searchInput') public searchInput!: ElementRef<HTMLInputElement>;

  /** Paginator. */
  @ViewChild('paginator') public paginator!: MatPaginator;

  /** Number of films per page.*/
  public readonly pageSize = 3;

  /** The set of provided page size options to display to the user. */
  public readonly pageSizeOptions = [this.pageSize, 5, 20];

  /** Films table column headings.*/
  public readonly displayedColumns: string[] = ['title', 'director', 'created'];

  private searchOption$ = new BehaviorSubject('');

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

  private tableOptions = combineLatest([this.paginationOptions$, this.sortOptions$, this.searchOption$]);

  private readonly destroy$: Subject<void> = new Subject<void>();

  /** Number of films in the collection. */
  public length = this.tableOptions.pipe(
    switchMap(([paginationOptions, sortOptions, searchOption]) =>
      this.filmsService.getCountFilms({ ...paginationOptions, ...sortOptions, searchValue: searchOption })),
  );

  /** Films.*/
  public films$ = this.tableOptions.pipe(
    switchMap(([paginationOptions, sortOptions, searchOption]) =>
      this.filmsService.fetchFilms({ ...paginationOptions, ...sortOptions, searchValue: searchOption })),
  );

  public constructor(private readonly filmsService: FilmsService) {
    this.length
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => {
        this.paginator.length = v;
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
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((i: Event) => (i.currentTarget as HTMLInputElement).value),
      debounceTime(500),
    )
      .subscribe(value => {
        this.searchOption$.next(value);
        this.paginator.firstPage();
      });
  }

  /** Changing pagination parameters by the user.
   * @param event Change event object that is emitted when
   * the user selects a different page size or navigates to another page.
   */
  public changePaginationOptions(event: PageEvent): void {
    this.paginationOptions$.next(event);
    this.films$ = this.tableOptions.pipe(
      switchMap(([paginationOptions, sortOptions, searchOption]) =>
        this.filmsService.fetchFilms({ ...paginationOptions, ...sortOptions, searchValue: searchOption })),
    );
  }

  /** Change sort options.
   * @param event Change event object that is emitted
   * when the user selects a different page size or navigates to another page.
   */
  public changeSortOptions(event: Sort): void {
    this.sortOptions$.next(event);
    this.paginator.firstPage();
    this.films$ = this.tableOptions.pipe(
      switchMap(([paginationOptions, sortOptions, searchOption]) =>
        this.filmsService.fetchFilms({ ...paginationOptions, ...sortOptions, searchValue: searchOption })),
    );
  }

  /** Film id.
   * @param _index Film index.
   * @param film Film.
   */
  public trackById(_index: number, film: Film): string {
    return film.id;
  }

}
