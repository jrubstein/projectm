import  { Moment } from '../../server/Moment'
import axios from 'axios'

export const FETCHING_MOMENTS = 'fetching-moments'
export const FETCHED_MOMENTS = 'fetched-moments'
export const OPEN_MODAL='open-modal'
export const CLOSE_MODAL='close-modal'
export const CHANGE_IMAGE='change-image'

export const changeImage = (currentImage: number) => {
    return {
        type: CHANGE_IMAGE,
        currentImage
    }
}

export const openModal = (currentImage: number) => {
    return {
        type: OPEN_MODAL,
        open: true,
        currentImage
    }
}

export const closeModal = (currentImage: number) => {
    return {
        type: CLOSE_MODAL,
        open: false,
        currentImage
    }
}

export const fetchingMoments = () => {
    return {
        type: FETCHING_MOMENTS,
        fetching: true,
    }
}

export const fetchMoments = (query) => {
    return dispatch => {
        if (query.length < 3 && query.length !== 0) {
            return
        }
        axios.get(`/search?q=${query}`)
        .then(
            (response) => {
                dispatch(fetchedMoments(response.data.hits.hits.map(hit => hit._source)))
            },
            (error) => console.log(error)
        )
    }
}

export const fetchedMoments = (moments: Moment[]) => {
    return {
        type: FETCHED_MOMENTS,
        moments,
        fetching: false,
        fetchedAt: new Date(),
    }
}