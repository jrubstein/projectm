import * as React from 'react'
import { connect } from 'react-redux';
import { State } from '../reducers/Store'
import { Moment } from '../../server/Moment'

interface MomentCardProperties {
    moment: Moment
    openModal: (index: number) => void
    index: number
}

export default class MomentsCard extends React.Component<MomentCardProperties> {
    render() {
        const { moment, index } = this.props
        return (
            <div className="moment-container">
                <section onClick={() => this.props.openModal(index)}>
                    <img src={moment.pictureURL} />
                </section>
                <section className="moment-title">
                    <span>{moment.title}</span>
                </section>
            </div>
        )
    }
}