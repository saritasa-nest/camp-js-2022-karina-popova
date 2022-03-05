import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AppError } from 'src/app/core/models/app-error';

import { LoginFormComponent } from '../login-form/login-form.component';

/** Registration form. */
@Component({
  selector: 'sw-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnDestroy {
  /** Form name. */
  public title = 'Sign up';

  /** Submit button name. */
  public nameButton = 'Sign up';

  /** Link to go to another form. */
  public nameLink = 'Go to Sign In';

  /** Error message. */
  public readonly errorMessage$: Subject<AppError | null> =
    new ReplaySubject<AppError | null>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
  ) { }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /** Opening a login form.*/
  public openSignInDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginFormComponent);
  }

  /** User registration.
   * @param registerForm Form.
   */
  public onSignUp(registerForm: FormGroup): void {
    if (!registerForm.valid) {
      return;
    }
    this.userService
      .signUp(registerForm.value.email, registerForm.value.password)
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
