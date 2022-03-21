import { AuthService } from 'src/api/services/auth.service';
import { User } from 'src/models/user';

/**
 * User state.
 */
export interface UserState {
  /** User. */
  readonly user: User | null;
  /** Is the user authorized. */
  readonly isAuthenticated: boolean;
  /** Authorization error. */
  readonly error?: string;
}
export const initialUserState: UserState = {
  user: AuthService.getCurrentUser(),
  isAuthenticated: AuthService.getCurrentUser() !== null,
};
