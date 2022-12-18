import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import * as reviewsActions from '../../store/reviews';
import SpotRevs from '../Reviews/Reviews'
import './SpotDetail.css'


export default function SpotDetail({review}) {
    const {spotId} = useParams();
    const dispatch = useDispatch()
    const history = useHistory()

    const spot = useSelector(state => state.spots.SpotDetails)
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.Reviews)
    
    // const cats = reviews.find(cat => cat.userId === user.id);

    useEffect(() => {
        dispatch(spotsActions.detailThunk(spotId))
        return () => dispatch(spotsActions.clearSpots())
    }, [dispatch, spotId])
    
    useEffect(() => {
        dispatch(reviewsActions.spotRevThunk(spotId))
    }, [dispatch, spotId])
    
    
    const deleteSpot = async (e) => {
        e.preventDefault();
        await dispatch(spotsActions.deleteThunk(spotId))
        await history.push(`/`)
    }
    

    if(!spot) return null

    return(
        <div className="detail-container">
            <h1 className="spot-name">{spot.name}</h1>
            <div className="details">
                <div className="ratings">
                    <i className="fa fa-star" ></i>{spot.avgStarRating}
                </div>
                <div className="split">·</div>
                <div className="review-count">
                    {(spot.numReviews)} reviews
                </div>
                <div className="split">·</div>
                <div className="area">
                    {`${spot.city}, ${spot.state}, ${spot.country}`}
                </div>
            </div>
            <div className="detail-img">
                <div className="pre-img">
                    <img className="main-img" src={spot.SpotImages[0].url}></img>
                </div>
                <div className="smaller-img">
                        {spot.SpotImages[1] ? (<img className='box-one' src={spot.SpotImages[1].url}></img>) : <div className="noimg1">No Image Available</div>}
                   
                    
                        {spot.SpotImages[2] ? (<img className='box-two' src={spot.SpotImages[2].url}></img>) : <div className="noimg2">No Image Available</div>}
                   
                        {spot.SpotImages[3] ? (<img className='box-three' src={spot.SpotImages[3].url}></img>) : <div className="noimg3">No Image Available</div>}
                   
                   
                        {spot.SpotImages[4] ? (<img className='box-four' src={spot.SpotImages[4].url}></img>) : <div className="noimg4">No Image Available</div>}
                   
                </div>
            </div>
            <div className="info">
                <div className="profile">
                    <div className="owner">
                        {spot.Owner.firstName}, {spot.Owner.lastName}
                    </div>
                </div>
                <div className="spot-info">
                    <div className="guests">5 guests · 5 bedrooms · 5 beds · 3 baths</div>
                </div>
            </div>
            <div className="hype">
                <div className="super">{spot.Owner.firstName} is a Superhost</div>
                <div className="super-detail">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                <div className="check">
                Great check-in experience
                </div>
                <div className="check-in">100% of recent guests gave the check-in process a 5-star rating.</div>
                <div className="cancel">Free cancelation for 48 hours</div>
            </div>
            <div className="star-container">
                <div className="thestar">
                    <i class="fa fa-star" ></i>{spot.avgStarRating}
                </div>
                <div>({spot.numReviews} Reviews)</div>
            </div>
            <div className='spotrevs'>
                {reviews && Object.values(reviews).length > 0 ? Object.values(reviews).map((review) => (
                    <SpotRevs key={`review-${review.id}`} review={review} spot={spot} />
                )) : <p>No reviews</p>}
            </div>
            <div className="create-rev">
                    {user && spot.Owner.id !== user.id && (<NavLink to={`/spots/${spotId}/reviews/newreview`}><button className='link-to-create'>Leave A Review</button></NavLink>)}
            </div>
            <div className="del-edit">
                {user && spot.Owner.id === user.id && (
                    <button onClick={deleteSpot} className="delete-butt">Delete This Spot</button>) }
                {user && spot.Owner.id === user.id && (
                    <NavLink to={`/spots/${spot.id}/edit`}>
                            <button className='edit-butt'>Edit This Spot</button>
                    </NavLink>)}
            </div>
        </div>
    )
    
}