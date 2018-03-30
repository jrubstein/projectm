import * as React from 'react'
import Container from './Container'

export default (props) => {
    return (
        <html>
            <head>
                <title>Title</title>
                {props.styles.map(style => (<link rel="stylesheet" type="text/css" href={`/${style}`} key={style}/>))}
            </head>
            <body>
                <main id="main-container">
                    <Container  name="name" />
                </main>
            </body>
            {props.scripts.map(script => (<script src={`/${script}`} key={script}></script>))}
        </html>
    )
}
