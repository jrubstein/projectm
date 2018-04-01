import * as React from 'react'
import { connect } from 'react-redux';
import { State } from '../reducers/Store'
import { Moment } from '../../server/Moment'

interface MomentCardProperties {
    moment: Moment,
}

export default class MomentsCard extends React.Component<MomentCardProperties> {
    render() {
        const { moment } = this.props
        return (
            <div className="moment-container">
                <section>
                    <img src={moment.pictureURL} />
                </section>
                <section>
                    <span>{moment.title}</span>
                </section>
            </div>
        )
    }
}