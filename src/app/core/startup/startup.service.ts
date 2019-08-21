import { Injectable, Injector, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { zip } from 'rxjs'
import { catchError } from 'rxjs/operators'
// import { DataDictService } from 'app/services/data-dict.service'
import { Store } from '@ngxs/store'
// import { UpdateDictAction } from 'app/store/action/dict.action'
import localeZh from '@angular/common/locales/zh-Hans'
import { registerLocaleData } from '@angular/common'
import { UpdateDictAction } from '@app/store/action/dict.action'
import * as dict from '@app/config/dict.config'

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(private store: Store) {}

  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      registerLocaleData(localeZh, 'zh-cn')
      resolve()
    }).then(() => {
      // TODO: 初始化逻辑
      this.store.dispatch(new UpdateDictAction(dict))
    })
  }
}
