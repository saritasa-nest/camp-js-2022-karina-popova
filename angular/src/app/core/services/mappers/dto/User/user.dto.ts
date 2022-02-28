/**
 * User dto.
 */
export interface UserDto {

  /** User name. */
  readonly displayName: string | null;

  /** Email. */
  readonly email: string | null;

  /** Phone number. */
  readonly phoneNumber: string | null;

  /** Photo URL. */
  readonly photoURL: string | null;

  /** The user's unique ID.*/
  readonly uid: string;
}
