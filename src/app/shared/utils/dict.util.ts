import { Injectable, ApplicationRef } from '@angular/core'
import { Store } from '@ngxs/store'
import { DictState } from '@app/store/state/dict.state'
import * as dict from '@app/config/enum.config'
@Injectable()
export class DictUtil {
  constructor(private store: Store) {}

  public getDict(dictType: dict.DictType | string) {
    this.store.selectSnapshot(DictState.getDict(dictType))
  }

  public get all() {
    return dict
  }
}
