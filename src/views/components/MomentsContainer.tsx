import * as React from 'react'
import { connect } from 'react-redux';
import { State } from '../reducers/Store'
import { Moment } from '../../server/Moment'
import MomentsCard from './MomentCard'

interface MomentsContainerProperties {
    moments: Moment[],
}

export class MomentsContainer extends React.Component<MomentsContainerProperties> {
    render() {
        return (
            <div className="moments-container">
                {!!this.props.moments.length && this.props.moments.map(
                    moment => <MomentsCard moment={moment} key={moment.id}/>
                )}
                {this.props.moments.length === 0 && <div className="moments-empty">There is no moments for this search</div>}
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