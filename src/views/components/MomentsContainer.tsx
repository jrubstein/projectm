import * as React from 'react'
import { connect } from 'react-redux';
import { State } from '../reducers/Store'
import { Moment } from '../../server/Moment'
import MomentsCard from './MomentCard'
import Lightbox from 'react-images'
import { openModal, closeModal, changeImage } from '../actions';

interface MomentsContainerProperties {
    moments: Moment[]
    open: boolean
    closeModal: () => void
    openModal: () => void
    changeImage: (index: number) => void
    currentImage: number
}

export class MomentsContainer extends React.Component<MomentsContainerProperties> {
    render() {
        return (
            <React.Fragment>
                <div className="moments-container">
                    {!!this.props.moments.length && this.props.moments.map(
                        (moment: Moment, index: number) => <MomentsCard moment={moment} key={moment.id} openModal={this.props.openModal} index={index}/>
                    )}
                    {this.props.moments.length === 0 && <div className="moments-empty">There is no moments for this search</div>}
                </div>
                {!!this.props.moments.length &&
                    <Lightbox
                        images={
                            this.props.moments.map(moment => {
                                return {
                                    src: moment.pictureURL.replace(/c_scale,w_768/ig, 'c_scale,w_1024'),
                                    caption: moment.title,
                                    thumbnail: moment.pictureURL,
                                }
                            }
                        )}
                        showThumbnails={true}
                        currentImage={this.props.currentImage}
                        isOpen={this.props.open}
                        onClickPrev={() => this.props.changeImage(this.props.currentImage - 1)}
                        onClickNext={() => this.props.changeImage(this.props.currentImage + 1)}
                        onClose={this.props.closeModal}
                        onClickThumbnail={(index: number) => this.props.changeImage(index)}
                    />
                }
          </React.Fragment>
          
        )
    }
}

const mapStateToProps = (state: State) => {
    return {
        moments: state.moments.moments,
        open: state.moments.open,
        currentImage: state.moments.currentImage || 0
    }
}
  
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal(0))
    },
    openModal: (index: number) => {
        dispatch(openModal(index))
    },
    changeImage: (index: number) => {
        dispatch(changeImage(index))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MomentsContainer)