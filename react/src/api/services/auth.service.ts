import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { User } from 'src/models/user';
import { UserMapper } from '../mappers/user.mapper';
import { app } from './initializeApp';

export namespace AuthService {
  const auth = getAuth(app);
  /** Fetch current user. */
  export function getCurrentUser(): User | null {
    return auth.currentUser ? UserMapper.fromDto(auth.currentUser) : null;
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
