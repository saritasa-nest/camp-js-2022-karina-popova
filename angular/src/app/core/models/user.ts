/** User.*/
export interface User {

  /** User ID. */
  readonly id: string;

  /** User name. */
  readonly displayName: string | null;

  /** Email. */
  readonly email: string | null;
}
