import { MockService } from '../mock.decorators'
import { userController } from 'app/config/service/user.controller'

export class UserMockService {
  //  private static logger: LoggerService =new LoggerService()
  @MockService({
    service: userController.login
  })
  public static login() {
    return true
    // const user = userinfos.find(x => x.userId === params.userId)
    // if (user) {
    //   return user
    // } else {
    //   throw new Error('用户不存在')
    // }
  }
}
