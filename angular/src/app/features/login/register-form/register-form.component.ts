import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'sw-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  public hide = false;

  public constructor(private fb: FormBuilder, public userService: UserService) {
  }

  public ngOnInit(): void {}

  public registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public onSignUp(): void {
    if (!this.registerForm.valid) {
      return;
    }
    this.userService.signUp(
      this.registerForm.value.email,
      this.registerForm.value.password,
    );
  }
}
