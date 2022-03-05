import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { AppError } from 'src/app/core/models/app-error';
import { UserService } from 'src/app/core/services/user.service';

import { RegisterFormComponent } from '../register-form/register-form.component';

/** Login form. */
@Component({
  selector: 'sw-login',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnDestroy {
  /** Link to go to another form. */
  public nameLink = 'Create New Account';

  /** Error message. */
  public readonly errorMessage$: Subject<AppError | null> =
    new ReplaySubject<AppError | null>();

  private readonly destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
  ) {}

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /** Opening a sign up form.*/
  public openSignUpDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(RegisterFormComponent);
  }

  /** User authorization.
   * @param loginForm Form.
   */
  public onLogin(loginForm: FormGroup): void {
    if (!loginForm.valid) {
      return;
    }
    this.userService
      .signIn(loginForm.value.email, loginForm.value.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (errors: AppError) => {
          this.errorMessage$.next(errors);
        },
        complete: () => {
          this.errorMessage$.next(null);
          this.dialog.closeAll();
        },
      });
  }
}
