import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FilmsListComponent } from './films-list/films-list.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [FilmsListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FilmsModule { }
