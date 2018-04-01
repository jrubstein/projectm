import * as React from 'react'
import { connect } from 'react-redux';
import {State} from '../reducers/Store'

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

const mapStateToProps = ({query}: State) => ({
    query
});
  
const mapDispatchToProps = (dispatch) => ({
    fetchMoments: (event) => {console.log(event.target.value)},
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Nagivation)