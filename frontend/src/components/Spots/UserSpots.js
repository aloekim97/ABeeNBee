import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { deleteThunk, userSpotThunk } from "../../store/spots";
import './UserSpots.css'


export default function UserSpots({spot}) {
    
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.UserSpots)
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    const deleteSpot = async (e) => {
        e.preventDefault();
        await dispatch(deleteThunk(spots.id))
        await history.push(`/spots/user`)
    }
    useEffect(() => {
        dispatch(userSpotThunk())
    }, [dispatch])

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
                    </div>
                )
            })}
        </div>
        </div>
    )
}