import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { AppError } from 'src/app/core/models/app-error';

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

  /** Link to go to another form. */
  @Input()
  public nameLink = '';

  /** Form field validator. */
  @Input()
  public authForm: FormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  /** Error message. */
  @Input()
  public errorMessage$: Subject<AppError | null> = new ReplaySubject<AppError | null>();

  /** Form submit. */
  @Output()
  public sendForm = new EventEmitter();

  /** Open another form. */
  @Output()
  public clickOpenDialog = new EventEmitter();

  public constructor(private readonly fb: FormBuilder) {}

  /** Emits an event containing a form. */
  public submitForm(): void {
    this.sendForm.emit(this.authForm);
  }

  /** Form open event. */
  public openDialog(): void {
    this.clickOpenDialog.emit();
  }
}
