import {csrfFetch} from './csrf'
import {normalizeData} from './spots'

const GET_SPOT_REVIEWS = '/reviews/GET_SPOT_REVIEWS'
const CREATE_REV = '/reviews/CREATE_REV'
const DELETE_REV = '/reviews/DELETE_REV'

const getSpotRev = (Revs) => {
    return {
    type: GET_SPOT_REVIEWS,
    Revs
    }
}

const createRev = (Rev) => {
    return {
    type: CREATE_REV,
    Rev
    }
}

const deleteRev = (reviewId) => {
    return {
    type: DELETE_REV,
    reviewId
    }
}

//thunkies

export const spotRevThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(res.ok) {
        const data = await res.json()
        dispatch(getSpotRev(data))
        return res
    }
} 

export const createRevthunk = (Rev, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Rev)
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(createRev(data))
        dispatch(getSpotRev(spotId))
        return data
    } else {
        throw res
    }
}

export const delRevThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if(res.ok) {
        dispatch(deleteRev(reviewId))
    }
}

// reducers
export default function reviewReducer(state = {}, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            const spotReviews = normalizeData(action.Revs.Reviews)
            newState["Reviews"] = spotReviews
            return newState
        case DELETE_REV:
            newState = {...state, spotRevs: {...state.spotRevs}}
            delete newState.spotRevs[action.reviewId];
            return newState;
        default:
            return state;
    }
}
