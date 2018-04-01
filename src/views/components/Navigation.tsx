import * as React from 'react'
import { connect } from 'react-redux'
import {State} from '../reducers/Store'
import { fetchMoments } from '../actions'

interface NavigationProperties {
    query: string,
    fetchMoments: () => void
}

export class Nagivation extends React.Component<NavigationProperties> {
    render() {
        return (
            <nav>
                <div>
                    <img src="" />
                    <input type="text" placeholder="Search something..." value={this.props.query} onChange={this.props.fetchMoments} />
                    <button type="button" />
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state: State) => ({
    query: state.moments.query
});
  
const mapDispatchToProps = (dispatch) => ({
    fetchMoments: (event) => {dispatch(fetchMoments(event.target.value))},
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Nagivation)