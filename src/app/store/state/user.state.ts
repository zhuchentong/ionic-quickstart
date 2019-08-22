import { State, Action, StateContext, Selector } from '@ngxs/store'
import { LoginAction, UpdateUserAction, LogoutAction } from '@store/action/user.action'
import { plainToClass, classToPlain } from 'class-transformer'
import { ExtendState } from '../extend'
import { UserEntity } from '@model/entity/user.entity'

@State<any>({
  name: 'user',
  defaults: null
})
export class UserState extends ExtendState {
  /**
   * 获取当前登录用户
   * @param state 用户数据
   */
  @Selector()
  public static getUser(state: UserEntity) {
    if (state) {
      return plainToClass(UserEntity, state)
    } else {
      return null
    }
  }

  @Action(LoginAction)
  public login<T>({ setState }: StateContext<any>, { user }: LoginAction) {
    // 写入用户信息
    setState(classToPlain(user))
  }

  @Action(UpdateUserAction)
  public update<T>(state: StateContext<UserEntity>, { user }: UpdateUserAction) {
    // 获取当前用户信息
    const curretUser = classToPlain(user)
    // 剔除用户中的空值
    Object.entries(curretUser).forEach(([key, value]) => {
      if (value === undefined) {
        delete curretUser[key]
      }
    })
    // 更新用户数据
    this.updateState(state, curretUser)
  }

  @Action(LogoutAction)
  public logout<T>({ setState }: StateContext<UserEntity>) {
    setState(null)
  }
}
