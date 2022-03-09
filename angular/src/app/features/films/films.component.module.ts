import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';

import { MatSortModule } from '@angular/material/sort';

import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';

import { FilmsListComponent } from './films-list/films-list.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent,
  },
];

/** Functions for managing the films list.*/
@NgModule({
  declarations: [FilmsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonSharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class FilmsModule { }
