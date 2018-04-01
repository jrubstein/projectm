import  { Moment } from '../../server/Moment'
import axios from 'axios'

export const FETCHING_MOMENTS = 'fetching-moments'
export const FETCHED_MOMENTS = 'fetched-moments'

export const fetchingMoments = () => {
    return {
        type: FETCHING_MOMENTS,
        fetching: true,
    }
}

export const fetchMoments = (query) => {
    return dispatch => {
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