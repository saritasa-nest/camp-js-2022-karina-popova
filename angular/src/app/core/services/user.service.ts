import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { from, Observable } from 'rxjs';

import UserCredential = firebase.auth.UserCredential;

/** * dsfdsfdsf.*/
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private constructor(
    private auth: AngularFireAuth,
  ) { }

  public getUser(): AngularFireAuth {
    return this.auth;
  }

  public login(email: string, password: string): Observable<UserCredential> {
    return from(this.auth.signInWithEmailAndPassword(email, password));
  }

  public signUp(email: string, password: string, displayName: string): Observable<UserCredential> {
    const signUp$ = from(this.auth.createUserWithEmailAndPassword(email, password));
    signUp$.subscribe(userInfo =>
      userInfo.user?.updateProfile({
        displayName,
      }));
    return signUp$;
  }

  public logout(): void {
    this.auth.signOut();
  }
}
