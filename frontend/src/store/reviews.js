import {csrfFetch} from './csrf'

const GET_SPOT_REVIEWS = '/reviews/GET_SPOT_REVIEWS'
const CREATE_REV = '/reviews/CREATE_REV'
const DELETE_REV = '/reviews/DELETE_REV'

const getSpotRev = (review) => {
    return {
    type: GET_SPOT_REVIEWS,
    review
    }
}

const createRev = (review) => {
    return {
    type: CREATE_REV,
    review
    }
}

const deleteRev = (review) => {
    return {
    type: DELETE_REV,
    review
    }
}

//thunkies

export const spotRevThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    if(res.ok) {
        const data = await res.json()
        dispatch(getSpotRev(data))
        return res
    }
} 

export const createRevthunk = (input, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(input)
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(createRev(data))
        return data
    }
}

export const delRevThunk = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if(res.ok) {
       dispatch(deleteRev(reviewId))
    }
}

const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}

// reducers
export default function reviewReducer(state = {}, action) {
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const newState = {}
            const revArr = normalizeData(action.review.Reviews)
            newState['Reviews'] = revArr
            return newState
        }
        case CREATE_REV: {
            const newState = {...state, [action.review.id]: action.review}
            return newState
        }
        case DELETE_REV:
            const newState = {...state}
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}
