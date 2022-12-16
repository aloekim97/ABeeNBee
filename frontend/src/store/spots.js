import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_DETAIL = 'spots/GET_DETAIL';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const EDIT_SPOT = 'spots/EDIT_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const GET_USER_SPOT = 'spots/GET_USER_SPOT'
const CREATE = '/spots/CREATE_IMAGE'
const CLEAR = '/spots/CLEAR'

//actions
const getSpots = (payload) => {
    return {
        type: GET_SPOTS,
        payload
    }
}

const getDetail = (payload) => {
    return {
        type: GET_DETAIL,
        payload
    }
}

const createSpot = (payload) => {
    return {
        type: CREATE_SPOT,
        payload
    }
}

const editSpot = (payload) => {
    return {
        type: EDIT_SPOT,
        payload
    }
}

const deleteSpot = (payload) => {
    return {
        type: DELETE_SPOT,
        payload
    }
}

const userSpot = (payload) => {
    return {
        type: GET_USER_SPOT,
        payload
    }
}

const create = (image, spot) => {
    return {
        type: CREATE,
        image,
        spot
    }
}

export const clearSpots = () => {
    return {
        type: CLEAR
    }
}

//hunky thunk
export const allSpotsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/spots`, {
        method: "GET"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getSpots(data))
        return data
    }
}

export const detailThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`, {
        method: "GET"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getDetail(data))
        return data
    } else {
        throw res
    }
}

export const createThunk = (info) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(info)
    })
    const spot = await res.json()
    dispatch(createSpot(spot))
    return spot
}

export const addImg = (imageInfo, spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(imageInfo)
    })
    const img = await response.json()
    dispatch(create(img))
    return img
}

export const editThunk = (edits, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {"Contenet-Type": "application/json"},
        body: JSON.stringify(edits)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editSpot(data))
        return data
    }
}

export const deleteThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })
    if(res.ok) {
        dispatch(deleteSpot(spotId))
    }
}

export const userSpotThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current',{
        method: "GET"
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(userSpot(data))
        return data
    } else {
        throw res
    }
}

//normailze
export const normalizeData = (data) => {
    const obj = {};
    data.forEach(place => obj[place.id] = place)
    return obj
}

//reducer
export default function spotsReducer(state = {}, action) {
    let newState = {...state}
    switch (action.type) {
        case CLEAR:
            return {}
        case GET_SPOTS:
            const allSpots = normalizeData(action.payload.Spots);
            newState["Spots"] = allSpots;
        return newState
        case GET_DETAIL:
            newState["SpotDetails"] = action.payload
            return newState
        case CREATE_SPOT:
            newState["NewSpot"] = action.payload;
            return newState
        case EDIT_SPOT:
            newState = {...state, [action.payload.id]: action.spot}
            return newState
        case DELETE_SPOT: 
            delete newState[action.spotId]
            return newState
        case GET_USER_SPOT:
            const userSpot = normalizeData(action.payload.Spots)
            newState['UserSpots'] = userSpot;
            return newState;
        case CREATE:
            newState = {...state, [action.spot.id]: {...action.spot, previewImage: action.img.url}}
        default:
            return state;
    }
}