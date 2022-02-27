import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';
import { HandingErrorPipe } from 'src/app/shared/pipes/handing-error.pipe';

import { MatDialogModule } from '@angular/material/dialog';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent, HandingErrorPipe],
  imports: [
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonSharedModule,
  ],
})
export class LoginModule { }
