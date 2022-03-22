import { Injectable } from '@angular/core';

import { User } from '../../models/user';

import { UserDto } from './dto/user/user.dto';

/** User mapper. */
@Injectable({
  providedIn: 'root',
})
export class UserMapper {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return {
      id: dto.uid,
      email: dto.email,
    };
  }
}
