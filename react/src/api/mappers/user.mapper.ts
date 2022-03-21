import { User } from 'src/models/user';
import { UserDto } from '../dtos/user.dto';

export namespace UserMapper {
  /**
   * Maps dto to model.
   * @param userDto User dto.
   */
  export function fromDto(userDto: UserDto): User {
    return new User({
      email: userDto.email,
    });
  }
}
