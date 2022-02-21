import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';

import { UserMapper } from './mappers/user.mapper';

/** * dsfdsfdsf.*/
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(
    private auth: AngularFireAuth,
    private readonly userMapper: UserMapper,
  ) {}

  public getUser(): Observable<firebase.User | null> {
    return this.auth.user;
  }

  // public login(email: 'alex@mail.ru', password: '123456'): Observable<User> {
  //   return this.auth.signInWithEmailAndPassword(email, password);
  // }

  public logout() {
    this.auth.signOut();
  }
}
