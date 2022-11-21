import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editThunk } from "../../store/spots";

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
    const [url, setUrl] = useState('');
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
            setUrl('');
            setErrors([]);
        }
    }, [spot])

    const user = useSelector(state => state.session.user)

    if(!user) return <Redirect to='/' />

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
            url,
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
            setUrl('')
            history.push(`/spots/current`);
        })
    };
    
    return (
        <div className='entire-create-page'>
            <h1>Edit Your Spot!</h1>
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
                <button className="create-submit-button" type="submit">Make Changes</button>
            </form>

        </div>
    )
}