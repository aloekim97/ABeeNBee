import React, { useEffect} from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './Spots.css'

export default function AllSpots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.Spots)
    
    useEffect(() => {
        dispatch(spotActions.allSpotsThunk())
    }, [dispatch])

    if(!spots) return null

    return (
        <div>
            <ul className='spots-container'>
                {Object.values(spots).map((spot) => {
                    return (
                        <div className="single-spot" key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
                                <img src={spot.previewImage} alt="house-img" className="images"/>
                            </NavLink>
                            <div className="spot-desc">
                                <div>{spot.city}, {spot.state}</div>
                                <div>{spot.name}</div>
                                <div>${spot.price}/night</div>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

