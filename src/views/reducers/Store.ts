import { Moment } from '../../server/Moment'
import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createStore } from 'redux'
import { Store } from 'react-redux'
import { reducer } from './Moments'

export interface State {
    moments:{
        moments: Moment[],
        query?: string,
        open: boolean,
        currentImage?: number
    }
}

export const initialState: State = {moments: {moments: [], open: false}}

export const combinedReducers = combineReducers<State>({
    moments: reducer,
})

export const createNewStore = (init: State = initialState): Store<State> => {
    return createStore(combinedReducers , init, applyMiddleware(thunk))
}