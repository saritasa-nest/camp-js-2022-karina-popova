import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { app } from './initializeApp';

export namespace AuthService {
  const auth = getAuth(app);

  /** Fetch current user. */
  export function fetchCurrentUser(): Promise<User | null> {
    return new Promise(resolve => {
      auth.onAuthStateChanged(user => {
        resolve(user);
      });
    });
  }

  /**
   * User authorization.
   * @param email - User's current email.
   * @param password - User's current password.
   */
  export function signIn(
    email: string,
    password: string,
  ): Promise<UserCredential | null> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Sign Up.
   * @param email - User's current email.
   * @param password - User's current password.
   */
  export async function signUp(
    email: string,
    password: string,
  ): Promise<UserCredential | null> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /** Sign out. */
  export function logOut(): Promise<void> {
    return signOut(auth);
  }
}
