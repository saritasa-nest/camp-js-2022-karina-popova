import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseError } from 'firebase/app';
import { ReplaySubject, Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

import { RegisterFormComponent } from '../register-form/register-form.component';

/** Login form. */
@Component({
  selector: 'sw-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  /** Attribute to hide the password. */
  public hide = false;

  /** Error message. */
  public errorMessage$: Subject<FirebaseError | null> = new ReplaySubject<FirebaseError | null>();

  /** Login form. */
  public loginForm!: FormGroup;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private dialog: MatDialog,
  ) {
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public openDialogSignUp(): void {
    this.dialog.closeAll();
    this.dialog.open(RegisterFormComponent);
  }

  /** User authorization. */
  public onLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.userService.login(
      this.loginForm.value.email,
      this.loginForm.value.password,
    ).subscribe({
      error: (errors: FirebaseError) => {
        this.errorMessage$.next(errors);
      },
      complete: () => {
        this.errorMessage$.next(null);
        this.dialog.closeAll();
      },
    });
  }
}
