import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Observable } from 'rxjs';
import firebase from 'firebase/compat';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sw-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public hide = false;

  public constructor(private fb: FormBuilder, public userService: UserService) {
  }
  ngOnInit(): void {
  }

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public onLogin(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.userService.login(
      this.loginForm.value.email,
      this.loginForm.value.password,
    );
  }
}
