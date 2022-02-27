import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from 'src/app/features/login/login-form/login-form.component';
import { RegisterFormComponent } from 'src/app/features/login/register-form/register-form.component';

@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input()
  public user: AngularFireAuth;

  public constructor(
    public userService: UserService,
    public dialog: MatDialog,
  ) {
    this.user = this.userService.getUser();
  }

  public openDialogSignIn(): void {
    this.dialog.open(LoginFormComponent);
  }

  public openDialogSignUp(): void {
    this.dialog.open(RegisterFormComponent);
  }

  ngOnInit(): void {}

  public signOut(): void {
    this.userService.logout();
  }
}
