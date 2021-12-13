import { Roles } from 'src/users/user.model';

export class UserDto {
  email: string;
  password: string;
  role: Roles;
}
