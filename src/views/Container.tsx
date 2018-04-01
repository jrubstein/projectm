import * as React from 'react'
import Nagivation from './components/Navigation'
import MomentsContainer from './components/MomentsContainer'

export default (props) => {
    return (
        <React.Fragment>
            <Nagivation />
            <MomentsContainer />
        </React.Fragment>
    )
}