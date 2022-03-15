import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from 'src/app/core/guards/authorization.guard';

import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmAddComponent } from './films-management/film-add/film-add.component';
import { FilmEditComponent } from './films-management/film-edit/film-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent,
  },
  {
    path: 'details/:id',
    canActivate: [AuthorizationGuard],
    component: FilmDetailsComponent,
  },
  {
    path: 'edit',
    canActivate: [AuthorizationGuard],
    component: FilmEditComponent,
  },
  {
    path: 'create',
    canActivate: [AuthorizationGuard],
    component: FilmAddComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

/** Films routing module.*/
@NgModule({
  declarations: [],
  providers: [AuthorizationGuard],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsRoutingModule {}
