import { csrfFetch } from "./csrf";

const CREATE = '/spots/CREATE_IMAGE'

const create = (image) => {
    return {
        type: CREATE,
        image
    }
}

export const addImg = (imageInfo, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(imageInfo)
    })
    const img = await response.json()
    dispatch(create(img))
    return img
}

const imageReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE:
            const newState = {...state, [action.image.id]: action.image}
            return newState
            default: return state
    }
}