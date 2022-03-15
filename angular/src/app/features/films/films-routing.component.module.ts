import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from 'src/app/core/guards/authorization.guard';

import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmCreateComponent } from './films-management/film-create/film-create.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent,
  },
  {
    path: 'details/:id',
    canActivate: [AuthorizationGuard],
    component: FilmDetailsComponent,

    // children: [
    //   {
    //     path: 'create',
    //     canActivate: [AuthorizationGuard],
    //     component: FilmCreateComponent,
    //   },
    // ],
  },
  {
    path: 'create',
    canActivate: [AuthorizationGuard],
    component: FilmCreateComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },

  // {
  //   path: ':id/create',
  //   canActivate: [AuthorizationGuard],
  //   component: FilmCreateComponent,
  // },
];

/** Films routing module.*/
@NgModule({
  declarations: [],
  providers: [AuthorizationGuard],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilmsRoutingModule { }
