import { Injectable } from '@angular/core';

import { User } from '../../models/user';

import { UserProfile } from './dto/User/user.dto';
import { IMapperFromDto } from './mapper';

@Injectable({
  providedIn: 'root',
})
export class UserMapper implements IMapperFromDto<UserProfile | null, User | null> {
  public fromDto(user: UserProfile | null): User | null {
    if (user) {
      return {
        email: user.email,
      };
    }
    return null;
  }
}
