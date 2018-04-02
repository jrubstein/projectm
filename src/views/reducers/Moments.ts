import { initialState, State } from './Store'
import { FETCHED_MOMENTS, OPEN_MODAL, CLOSE_MODAL, CHANGE_IMAGE } from '../actions';

export const reducer =  (state: State = initialState, action): State => {
    switch (action.type) {
      case FETCHED_MOMENTS:
        return Object.assign({}, state, {moments: action.moments})
      case CLOSE_MODAL:
      case OPEN_MODAL:
        return Object.assign({}, state, {open: action.open, currentImage: action.currentImage})
      case CHANGE_IMAGE:
        return Object.assign({}, state, {currentImage: action.currentImage})
      default:
        return state
    }
}