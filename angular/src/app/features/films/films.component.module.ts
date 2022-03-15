import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';

import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmsRoutingModule } from './films-routing.component.module';
import { FilmsManagementComponent } from './films-management/films-management.component';
import { FilmCreateComponent } from './films-management/film-create/film-create.component';

/** Functions for working with the films table.*/
@NgModule({
  declarations: [
    FilmsListComponent,
    FilmDetailsComponent,
    FilmsManagementComponent,
    FilmCreateComponent,
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    CommonSharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class FilmsModule { }
