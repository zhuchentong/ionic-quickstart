import { Pipe, PipeTransform } from '@angular/core'
import { Store } from '@ngxs/store'
import { DictState } from '@app/store/state/dict.state'

@Pipe({
  name: 'dict'
})
export class DictPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(value: any): any {
    const dict = this.store.selectSnapshot(DictState.getDict())
    if (!dict) {
      return ''
    }

    const target = Object.entries(dict)
      .map(([key, list]: [string, any[]]) => list)
      .flat()
      .find(x => x.code === value)

    if (target) {
      return target.name
    }
  }
}
