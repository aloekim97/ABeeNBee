import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/GET_SPOTS';
const GET_DETAIL = 'spots/GET_DETAIL';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const EDIT_SPOT = 'spots/EDIT_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const GET_USER_SPOT = 'spots/GET_USER_SPOT'

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

//hunky thunk
export const allSpotsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/spots`, {
        method: "GET"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(getSpots(data))
        return data
    } else {
        throw res
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

export const createThunk = (spot, preview) => async (dispatch) => {
    const res = await fetch(`/api/spots`, {
        method: "POST",
        headers: {"Contenet-Type": "application/json"},
        body: JSON.stringify(spot)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(createSpot(data))
        const img = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: "POST",
            body: JSON.stringify(preview),
          });
          if (img.ok) {
            return data
          } else {
            throw img;
          }
    } else {
        throw res
    }
}

export const editThunk = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: {"Contenet-Type": "application/json"},
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const data = await Response.json()
        dispatch(editSpot(data))
        return data
    } else {
        throw res
    }
}

export const deleteThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`,
    {method: "DELETE"})
    
    if(res.ok) {
        dispatch(deleteSpot(spotId))
        return 
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
    console.log("Action is " + action.type)
    let newState = {...state}
    switch (action.type) {
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
            newState = {...state, userSpots: {...state.userSpots}, allSpots:{...state.allSpots}};
            newState.userSpot[action.payload.id] = action.payload;
            newState.allSpots[action.payload.id] = action.payload;
            return newState
        case DELETE_SPOT: 
            newState = {...state, userSpots: {...state.userSpot}};
            delete newState.userSpots[action.spotId]
            return newState
        case GET_USER_SPOT:
            const userSpot = normalizeData(action.payload.Spots)
            newState['UserSpots'] = userSpot;
            return newState;
        default:
            return state;
    }
}