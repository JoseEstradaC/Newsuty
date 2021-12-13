export enum Roles {
  admin = 'admin',
  user = 'user',
}

export interface UserDto {
  email: string;
  password: string;
  role: Roles;
}
