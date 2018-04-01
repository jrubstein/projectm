import * as React from 'react'
import { connect } from 'react-redux';
import { State } from '../reducers/Store'
import { Moment } from '../../server/Moment'

interface MomentsContainerProperties {
    moments: Moment[],
}

export class MomentsContainer extends React.Component<MomentsContainerProperties> {
    render() {
        return (
            <div className="moments-container">
                {this.props.moments.map(
                    moment => <div key={moment.id} className="moment">{moment.title}</div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: State) => {
    return { moments: state.moments.moments }
}
  
const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MomentsContainer)