import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** Authorization form. */
@Component({
  selector: 'sw-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  /** Attribute to hide the password. */
  public hide = false;

  /** Form name. */
  @Input()
  public title = 'Sign in';

  /** Submit button name. */
  @Input()
  public nameButton = 'Sign in';

  /** Form field validator. */
  @Input()
  public authForm: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  /** Form submit. */
  @Output()
  public sendForm = new EventEmitter();

  public constructor(private readonly fb: FormBuilder) { }

  /** Emits an event containing a form. */
  public submitForm(): void {
    if (this.authForm.valid) {
      this.sendForm.emit(this.authForm.value);
    }
  }
}
