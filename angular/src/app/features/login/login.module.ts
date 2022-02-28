import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonSharedModule } from 'src/app/shared/common-shared.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

/** Features that allow to register and log in.*/
@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
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
