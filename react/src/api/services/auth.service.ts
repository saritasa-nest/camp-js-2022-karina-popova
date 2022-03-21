import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
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
  export async function signIn(email: string, password: string): Promise<User | null> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return UserMapper.fromDto(userCredential.user);
  }

  /**
   * Sign Up.
   * @param email - User's current email.
   * @param password - User's current password.
   */
  export async function signUp(email: string, password: string): Promise<User | null> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return UserMapper.fromDto(userCredential.user);
  }

  /** Sign out. */
  export function logOut(): Promise<void> {
    return signOut(auth);
  }
}
