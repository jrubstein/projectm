import { Moment } from '../../server/Moment'
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { Store } from 'react-redux';
import { reducer } from './Moments'

export interface State {
    moments: Moment[],
    query?: string
}

export const initialState: State = {moments: []}

export const combinedReducers = combineReducers<State>({
    moments: reducer,
})

export const createNewStore = (init: State = initialState): Store<State> => {
    return createStore(combinedReducers , init)
}