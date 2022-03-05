import { Pipe, PipeTransform } from '@angular/core';
import { AppError } from 'src/app/core/models/app-error';

/** * Handling registration and login errors.*/
@Pipe({
  name: 'handingError',
})
export class HandingErrorPipe implements PipeTransform {
  /**
   * .
   * @param value Error.
   */
  public transform(value: AppError | null): string {
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
      case 'auth/wrong-password':
        return 'Wrong password';
      default:
        return '';
    }
  }

}
