import { createThunk } from "../../store/spots"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";


export default function CreateSpot() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState([])
    

    const user = useSelector(state => state.session.user)
    if(!user) return <Redirect to='/' />
    if(errors.length) return

    const onSub = (e) => {
        e.preventDefault();
        const newInfo = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            url,
        } 
        return dispatch(createThunk(newInfo))
            .then((spot) => {
                history.push(`/spot/${spot.id}`)
            })
        }

    return (
        <div className='entire-create-page'>
            <h1>Create New Spot</h1>
            <ul>
                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <form onSubmit={onSub} className="create">
                <div>
                    <input placeholder="Name"
                        type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input placeholder="Address"
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input placeholder="City"
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input placeholder="State"
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input placeholder="Country"
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input placeholder="Lat"
                    type="number"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    requried
                    />
                </div>
                <div>
                    <input placeholder="Lng"
                    type="number"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    requried
                    />
                </div>
                <div>
                    <input placeholder="Url"
                        type='text'
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div id="price/night">&nbsp;Price/night</div>
                    <input placeholder="Price/night"
                        id="price"
                        type='number'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea placeholder="Description"
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button className="create-submit-button" type="submit">Host New Spot</button>
            </form>

        </div>
    )
}
