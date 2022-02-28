import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from 'src/app/features/login/login-form/login-form.component';
import { RegisterFormComponent } from 'src/app/features/login/register-form/register-form.component';
import { User } from 'src/app/core/models/user';
import { Observable } from 'rxjs';

/** Page header.*/
@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  /** User.*/
  @Input()
  public user$: Observable<User | null>;

  public constructor(
    private readonly userService: UserService,
    private readonly dialog: MatDialog,
  ) {
    this.user$ = this.userService.user$;
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser();
  }

  /** Opening a login form.*/
  public openDialogSignIn(): void {
    this.dialog.open(LoginFormComponent);
  }

  /** Opening a sign up form.*/
  public openDialogSignUp(): void {
    this.dialog.open(RegisterFormComponent);
  }

  /** Logout user profile.*/
  public signOut(): void {
    this.userService.logout();
  }
}
