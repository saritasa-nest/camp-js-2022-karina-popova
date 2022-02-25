import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseError } from 'firebase/app';

@Pipe({
  name: 'handingError',
})
export class HandingErrorPipe implements PipeTransform {
  /**
   * .
   * @param value Error.
   */
  public transform(value: FirebaseError | null): string {
    switch (value?.code) {
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/invalid-display-name':
        return 'Invalid display name';
      case 'auth/invalid-email':
        return 'Invalid email';
      case 'auth/invalid-password':
        return 'Invalid password';
      case 'auth/user-not-found':
        return 'User not found';
      default:
        return '';
    }
  }

}
