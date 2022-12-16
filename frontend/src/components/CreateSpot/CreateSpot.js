import { createThunk } from "../../store/spots"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import './CreateSpot.css'
import { addImg } from "../../store/spots";


export default function CreateSpot() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState([])
    

    const user = useSelector(state => state.session.user)
    if(!user) return <Redirect to='/' />

    const onSub = async (e) => {
        e.preventDefault();
        
        let err=[];
        if(name.length < 3) err.push('Must be a valid name')
        if(address.length < 3) err.push('Must be a valid address')
        if(city.length < 2) err.push('Must be a valid city')
        if(state.length < 2) err.push('Must be a valid state')
        if(country.length < 3) err.push('Must be a valid country')
        if(url.length < 10) err.push('Must be a valid url')
        if(name.length < 1) err.push('price must be greater than $1')
        if(description.length < 2) err.push('please leave a description')

        setErrors(err)

        if (err.length) return errors

        const info = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
        const newSpot = await dispatch(createThunk(info))

        const imageInfo = {
            url: url,
            preview: true 
        }
        dispatch(addImg(imageInfo, newSpot))
        history.push('/')
    }


    return (
        <div className='entire-create-page'>
            <h1 className="list">List Your Home</h1>
            <form onSubmit={onSub} className="create">
            <ul>
                {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
                <div className="home">
                    <input className="box1"
                        placeholder="Name"
                        type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="addy">
                    <input className="box3"
                        placeholder="Address"
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="city">
                    <input className="box3"
                        placeholder="City"
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </div>
                <div className="state">
                    <input className="box3"
                        placeholder="State"
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                    />
                </div>
                <div className="country">
                    <input className="box3"
                        placeholder="Country"
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div className="lat">
                    <input className="box3"
                        placeholder="Lat"
                        type="number"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        requried
                    />
                </div>
                <div className="lng">
                    <input className="box3"
                        placeholder="Lng"
                        type="number"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        requried
                    />
                </div>
                <div className="url">
                    <input className="box3"
                        placeholder="Url"
                        type='text'
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        required
                    />
                </div>
                <div className="price">
                    <input className="box4"
                        placeholder="Price/night"
                        id="price"
                        type='number'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="desc">
                    <textarea className="descbox"
                        placeholder="Description"
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
