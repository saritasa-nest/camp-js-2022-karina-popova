import { Immerable, OmitImmerable } from './immerable';

/**
 * User.
 */
export class User extends Immerable {
  /** Email. */
  public readonly email: string | null;

  public constructor(data: UserInitArgs) {
    super();
    this.email = data.email;
  }
}

type UserInitArgs = OmitImmerable<User>;
