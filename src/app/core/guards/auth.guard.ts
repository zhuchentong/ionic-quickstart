import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Store } from '@ngxs/store'
// import { UserState } from '@store/state/user.state'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}
  /**
   * 验证是否可以跳转
   * @param next 路由快照
   * @param state 路由参数
   */
  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // 检测用户是否已经登录
    const result = this.checkUser()
    // 如果未登录则跳转登录页面，登录完成后恢复
    if (!result) {
      this.router.navigate(['/user/user-login', { redirect: state.url }])
    }
    return result
  }

  /**
   * 检查用户状态
   */
  private checkUser(): boolean {
    return true
    // const user = this.store.selectSnapshot(UserState.getUser)
    // return !!(user && user.userId)
  }
}
