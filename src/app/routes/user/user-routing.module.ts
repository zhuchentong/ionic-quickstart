import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'

import { UserPage } from './user.page'
import { LoginPage } from './login/login.page'

// 路由页面
const routes: Routes = [{ path: '', component: UserPage }, { path: 'login', component: LoginPage }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
