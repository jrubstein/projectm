import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider, Store } from 'react-redux'
import { createStore, Reducer } from 'redux'

import {createNewStore} from './reducers/Store'
import Container from './Container'
import './styles/root.css'
import { initialState, State } from './reducers/Store';

const init: State = (window as any).__INIT_STATE__ || initialState

ReactDOM.hydrate(
    <Provider store={createNewStore(init)}>
        <Container />
    </Provider>,
    document.getElementById('main-container')
)