import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store'
import { ExtendState } from '@app/store/extend'
import { UpdateDictAction } from '@app/store/action/dict.action'
import { DictType } from '@app/config/enum.config'

@State<any>({
  name: 'dict',
  defaults: {}
})
export class DictState extends ExtendState {
  /**
   * 获取字典项
   * @param state 字典数据
   */
  @Selector()
  public static getDict(dictType?: DictType | string) {
    return createSelector(
      [DictState],
      ({ dict }) => {
        return dictType ? dict[dictType] : dict
      }
    )
  }

  @Action(UpdateDictAction)
  public updateDict<T>({ setState }: StateContext<any>, { dict }: UpdateDictAction) {
    setState(dict)
  }
}
