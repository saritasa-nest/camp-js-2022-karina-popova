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
  /** Loading current user. */
  readonly isLoading: boolean;
}
export const initialUserState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};
