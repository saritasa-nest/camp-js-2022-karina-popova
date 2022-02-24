import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'sw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input()
  public user: AngularFireAuth;

  public constructor(public userService: UserService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {}

  public signOut(): void {
    this.userService.logout();
  }
}
