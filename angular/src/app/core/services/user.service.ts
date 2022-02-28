import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat';

import { User } from '../models/user';

import UserCredential = firebase.auth.UserCredential;

import { UserMapper } from './mappers/user.mapper';

/** Service for working with the current user. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Current user. */
  public user$ = new Subject<User | null>();

  private constructor(
    private readonly auth: AngularFireAuth,
    private readonly userMapper: UserMapper,
  ) { }

  /** Checking the current user on page load. */
  public getCurrentUser(): Observable<User | null> {
    return this.auth.authState.pipe(map(userDto => userDto ? this.userMapper.fromDto(userDto) : null));
  }

  /**
   * User authorization.
   * @param email - User's current email.
   * @param password - User's current password.
   */
  public signIn(email: string, password: string): Observable<User | null> {
    const signIn$ = from(this.auth.signInWithEmailAndPassword(email, password))
      .pipe(map(userCredentil => userCredentil.user ? this.userMapper.fromDto(userCredentil.user) : null));
    signIn$.subscribe(user => this.user$.next(user));
    return signIn$;
  }

  /**
   * User registration.
   * @param email - User email.
   * @param password - User password.
   * @param displayName - Username.
   */
  public signUp(email: string, password: string, displayName: string): Observable<User | null> {
    const signUp$ = from(this.auth.createUserWithEmailAndPassword(email, password))
      .pipe(map(userCredentil => {
        this.updateDisplayName(signUp$, displayName);
        return userCredentil.user ? this.userMapper.fromDto(userCredentil.user) : null;
      }));
    return signUp$;
  }

  /** Logout user profile. */
  public async logout(): Promise<void> {
    await this.auth.signOut();
    return this.user$.next(null);
  }

  /** Update user name.
   * @param userCredentil - _____.
   * @param displayName - User name.
   */
  public async updateDisplayName(signUp$: Observable<User | null>, displayName: string): Promise<void> {
    (await this.auth.currentUser)?.updateProfile({
      displayName,
    });
    signUp$.subscribe(user => this.user$.next(user));
  }
}
