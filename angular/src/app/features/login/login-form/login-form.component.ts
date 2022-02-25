import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { ReplaySubject, Subject } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';

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
  ) {
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
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
        console.log(errors);
        this.errorMessage$.next(errors);
      },
      complete: () => {
        this.errorMessage$.next(null);
        this.router.navigate(['films']);
      },
    });
  }
}
