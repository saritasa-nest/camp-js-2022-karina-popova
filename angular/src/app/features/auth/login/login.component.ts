import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'sw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  @Input()
  public readonly user$: Observable<firebase.User | null>;

  public constructor(userService: UserService) {
    this.user$ = userService.getUser();
  }

  ngOnInit(): void {

  }

}
