import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AuthorizationGuard } from 'src/app/core/guards/authorization.guard';

import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDetailsComponent } from './film-details/film-details.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent,
  },
  {
    path: ':id',
    canActivate: [AuthorizationGuard],
    component: FilmDetailsComponent,
  },
];

/** Functions for working with the films table.*/
@NgModule({
  declarations: [FilmsListComponent, FilmDetailsComponent],
  providers: [AuthorizationGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonSharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
})
export class FilmsModule {}
