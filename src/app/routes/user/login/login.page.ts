import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngxs/store'
import { LoginAction } from '@app/store/action/user.action'
import { UserEntity } from '@app/model/entity/user.entity'
import { Location } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup
  private redirect: string

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  public ngOnInit() {
    // 获取待跳转页面
    this.redirect = this.route.snapshot.paramMap.get('redirect')

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  /**
   * 登录成功处理
   */
  public loginSuccess() {
    if (this.redirect) {
      this.router.navigate([this.redirect], {
        replaceUrl: true
      })
      return
    } else {
      this.location.back()
      // this.navCtrl.goBack(
    }
  }

  /**
   * 用户登录操作
   */
  public onLogin() {
    if (!this.loginForm.valid) {
      return
    }

    const user = new UserEntity()
    user.id = '1'
    user.username = 'user1'

    this.store.dispatch(new LoginAction(user))
    this.loginSuccess()
  }
}
