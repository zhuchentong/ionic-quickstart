import { NgModule } from '@angular/core'
import { SharedModule } from '@app/shared/shared.module'

import { UserRoutingModule } from './user-routing.module'

import { UserPage } from './user.page'
import { LoginPage } from './login/login.page'

const PAGES = [UserPage, LoginPage]
@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [...PAGES]
})
export class UserPageModule {}
