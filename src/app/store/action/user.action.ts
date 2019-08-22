import { UserEntity } from '@model/entity/user.entity'

export class LoginAction {
  public static readonly type = '[User] UserLogin'
  constructor(public user: UserEntity) {}
}

export class UpdateUserAction {
  public static readonly type = '[User] UpdateLogin'
  constructor(public user: UserEntity) {}
}

export class LogoutAction {
  public static readonly type = '[User] UserLogout'
}
