import { StateContext } from '@ngxs/store'

export class ExtendState {
  public updateState(state: StateContext<any>, value) {
    const { getState, setState } = state
    if (value) {
      setState({ ...getState(), ...value })
    }
  }
}
