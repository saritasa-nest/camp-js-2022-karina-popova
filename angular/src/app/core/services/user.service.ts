import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from 'firebase/app';
import { catchError, defer, map, Observable, throwError } from 'rxjs';

import { AppError } from '../models/app-error';

import { User } from '../models/user';

import { UserMapper } from './mappers/user.mapper';

/** Service for working with the current user. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(
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
    return defer(() => this.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        map(userCredential => userCredential.user ? this.userMapper.fromDto(userCredential.user) : null),
        catchError((error: FirebaseError) => throwError(() => this.matchErrorMessage(error))),
      );
  }

  /**
   * User registration.
   * @param email - User email.
   * @param password - User password.
   */
  public signUp(email: string, password: string): Observable<User | null> {
    return defer(() => this.auth.createUserWithEmailAndPassword(email, password))
      .pipe(
        map(userCredential => userCredential.user ? this.userMapper.fromDto(userCredential.user) : null),
        catchError((error: FirebaseError) => throwError(() => this.matchErrorMessage(error))),
      );
  }

  /** Logout user profile. */
  public logout(): void {
    this.auth.signOut();
  }

  /** Error handling.
   * @param error Firebase error.
   */
  public matchErrorMessage(error: FirebaseError): AppError {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new AppError('Email already in use');
      case 'auth/invalid-display-name':
        return new AppError('Invalid display name');
      case 'auth/invalid-email':
        return new AppError('Invalid email');
      case 'auth/invalid-password':
        return new AppError('Invalid password');
      case 'auth/user-not-found':
        return new AppError('User not found');
      case 'auth/wrong-password':
        return new AppError('Wrong password');
      default:
        return new AppError('error');
    }
  }
}
