import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { HandingErrorPipe } from './pipes/handing-error.pipe';

/** Shared module. */
@NgModule({
  declarations: [HeaderComponent, HandingErrorPipe],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    HandingErrorPipe,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class CommonSharedModule {}
