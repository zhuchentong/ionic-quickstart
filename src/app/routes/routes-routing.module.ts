import { NgModule } from '@angular/core'
import { RouterModule, Routes, PreloadAllModules } from '@angular/router'

import { RoutesComponent } from './routes.component'
import { AuthGuard } from '@core/guards/auth.guard'

// 路由页面
const routesPage: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserPageModule) }
]

// 完整路由
const routes: Routes = [
  {
    path: 'tabs',
    component: RoutesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
      ...routesPage
    ]
  },
  ...routesPage,
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class RoutesRoutingModule {}
