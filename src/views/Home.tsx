import * as React from 'react'
import Container from './Container'
import { Provider } from 'react-redux';
import {createNewStore} from './reducers/Store'
import * as Safe from 'react-safe'

export default (props) => {
    const initialState = `window.__INIT_STATE__ = {moments: {moments:${JSON.stringify(props.moments)}}}`
    return (
        <html>
            <head>
                <title>Project M</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {props.styles.map(style => (<link rel="stylesheet" type="text/css" href={`/${style}`} key={style}/>))}
            </head>
            <body>
                <main id="main-container">
                    <Provider store={createNewStore({moments: {moments: props.moments}})}>
                        <Container />
                    </Provider>
                </main>
            </body>
            <Safe.script>
                {initialState}
            </Safe.script>
            {props.scripts.map(script => (<script src={`/${script}`} key={script}></script>))}
        </html>
    )
}
