import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Container from './Container'
import './styles/root.css'

ReactDOM.hydrate(
    <Container name="name"/>,
    document.getElementById('main-container')
)