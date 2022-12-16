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
                            <div className="spot-deets">
                                <div className="loca">{spot.city}, {spot.state}</div>
                                <div className="numrev">
                                <i className="fa fa-star"></i>
                                {spot.AvgRating ? spot.AvgRating : 0}
                                </div>
                                <div className="cost">${spot.price} night</div>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

