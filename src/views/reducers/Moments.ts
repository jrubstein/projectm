import { initialState, State } from './Store'

export const reducer =  (state: State = initialState, action): State => {
    switch (action.type) {
      case 'FETCH_RESULT':
        return state
      default:
        return state
    }
}