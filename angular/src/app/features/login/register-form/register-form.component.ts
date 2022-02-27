import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { ReplaySubject, Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';

import { LoginFormComponent } from '../login-form/login-form.component';

/** Registration form. */
@Component({
  selector: 'sw-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  /** Attribute to hide the password. */
  public hide = false;

  /** Error message. */
  public errorMessage$: Subject<FirebaseError | null> = new ReplaySubject<FirebaseError | null>();

  /** Registration form. */
  public registerForm!: FormGroup;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) { }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.registerForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public openDialogSignIn(): void {
    this.dialog.closeAll();
    this.dialog.open(LoginFormComponent);
  }

  /** User registration.*/
  public onSignUp(): void {
    if (!this.registerForm.valid) {
      return;
    }
    this.userService.signUp(
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.displayName,
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
