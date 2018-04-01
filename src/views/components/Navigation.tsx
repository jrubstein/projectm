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
                    <img src="https://res.cloudinary.com/jonarub/image/upload/c_scale,w_40/v1522602062/wtd9ofi8dajaxrg8ihon.jpg" />
                    <input type="text" placeholder="Search something..." value={this.props.query} onChange={this.props.fetchMoments} />
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