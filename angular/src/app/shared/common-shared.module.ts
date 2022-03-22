import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { LoginModule } from '../features/login/login.module';

import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';

/** Shared module. */
@NgModule({
  declarations: [HeaderComponent, MainPageComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    LoginModule,
  ],
  exports: [
    HeaderComponent,
    MainPageComponent,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class CommonSharedModule { }
