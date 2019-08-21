import { NgModule, Optional, SkipSelf, ModuleWithProviders, APP_INITIALIZER } from '@angular/core'
import { CommonModule, APP_BASE_HREF } from '@angular/common'
import { throwIfAlreadyLoaded } from './module-import-guard'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { DefaultInterceptor } from './interceptors/default.interceptor'
import { EmptyInterceptor } from './interceptors/empty.interceptor'
import { StartupService } from './startup/startup.service'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { NgxsModule } from '@ngxs/store'
import { LoggerModule, Level } from '@ngx-toolkit/logger'
import { environment } from '@env/environment'
import { states } from '@app/store'

// 第三方插件模块
const GLOBAL_THIRD_MODULES = [
  // ngxs存储插件
  NgxsModule.forRoot(states, { developmentMode: !environment.production }),
  // ngxs持久化插件
  NgxsReduxDevtoolsPluginModule.forRoot(),
  // ngxs开发日志插件
  NgxsStoragePluginModule.forRoot(),
  // 日志模块
  LoggerModule.forRoot(environment.production ? Level.ERROR : Level.LOG)
]

@NgModule({
  declarations: [],
  imports: [CommonModule, ...GLOBAL_THIRD_MODULES],
  exports: [LoggerModule, NgxsModule, NgxsReduxDevtoolsPluginModule, NgxsStoragePluginModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        StartupService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: EmptyInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DefaultInterceptor,
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory(startupService: StartupService) {
            return () => startupService.load()
          },
          deps: [StartupService],
          multi: true
        }
      ]
    }
  }
}
