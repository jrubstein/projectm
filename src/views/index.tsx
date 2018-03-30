import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Container from './Container'
import './styles/root.css'

ReactDOM.hydrate(
    <Container />,
    document.getElementById('main-container')
)