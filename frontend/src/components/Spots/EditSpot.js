import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editThunk } from "../../store/spots";
import './EditSpot.css'

export default function EditSpot() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState([]);

    const spot = useSelector(state => state.spots.SpotDetails);

    useEffect(() => {
        if(spot) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setCountry(spot.country);
            setLat(spot.lat);
            setLng(spot.lng);
            setName(spot.name);
            setDescription(spot.description);
            setPrice(spot.price);
            setErrors([]);
        }
    }, [spot])

    const user = useSelector(state => state.session.user)

    const onSub = (e) => {
        e.preventDefault();

        const err = [];

        if(name.length < 1) err.push('Must be longer than one letter.')
        if(price < 1) err.push('must be a valid price')

        setErrors(err)

        if(errors.length) return

        const edits = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        }

        return dispatch(editThunk(edits, spotId))
        .then(() => {
            setAddress('')
            setCity('')
            setState('')
            setCountry('')
            setLat('')
            setLng('')
            setName('')
            setDescription('')
            setPrice('')
            setErrors([])
            history.push('/');
        })
    };
    
    return (
        <div className='edit-page'>
            <form onSubmit={onSub} className="create">
                <h1 className="list">Edit Your Spot!</h1>
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
                <div className="price">
                    <div id="price/night"></div>
                    <input className="box3"
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
                <button className="create-submit-button" type="submit">Update</button>
            </form>

        </div>
    )
}