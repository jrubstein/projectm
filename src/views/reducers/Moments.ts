import { initialState, State } from './Store'
import { FETCHED_MOMENTS } from '../actions';

export const reducer =  (state: State = initialState, action): State => {
    switch (action.type) {
      case FETCHED_MOMENTS:
        return Object.assign({}, state, {moments: action.moments})
      default:
        return state
    }
}