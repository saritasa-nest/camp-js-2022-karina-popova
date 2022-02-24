import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { FilmsListComponent } from './films-list/films-list.component';
import { FilmComponent } from './film/film.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent,
  },
];

@NgModule({
  declarations: [FilmComponent, FilmsListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class FilmsModule {}
