import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { deleteThunk, userSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";

export default function UserSpots({spot}) {
    
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.UserSpots)
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    useEffect(() => {
        dispatch(userSpotThunk())
    }, [dispatch])

    const delButt = (e) => {
        e.preventDefault()
        dispatch(deleteThunk(spot.id))
    }
    const editButt = (e) => {
        e.preventDefault()
        history.push(`/spots/${spot.id}/edit`)
    }
    
    console.log()
    if(!user) return <Redirect to='/' />
    if(!spots) return <h1>No spots</h1>
    return(
        <div className="your-spot-container">
        <div className="your spots">
            {Object.values(spots).map((spot) => {
                return(
                    <div className="the-spots" key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} className='links'>
                            <div className="card">
                                <div className="one-spot">
                                    <img src={`${spot.previewImage}`} alt={spot.id} className='image' />
                                </div>
                                <div className="spot-info">
                                    <div className="name">{spot.name}</div>
                                    <div className="location">{spot.city}, {spot.state}</div>
                                    <div className="price">{spot.price}/night</div>
                                </div>
                            </div>
                        </NavLink>
                        <div className="buttons">
                            <button onClick={delButt} className='delete-button'>Delete</button>
                            <button onClick={editButt} className='edit-button'>Edit</button>
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
    )
}