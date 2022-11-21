import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import * as spotsActions from "../../store/spots";
import * as reviewsActions from '../../store/reviews';
import SpotRevs from '../Reviews/Reviews'


import './SpotDetail.css'

export default function SpotDetail() {
    const {spotId} = useParams();
    const dispatch = useDispatch()
  

    const spot = useSelector(state => state.spots.SpotDetails)
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.Reviews)

    console.log(user)

    useEffect(() => {
        dispatch(reviewsActions.spotRevThunk(spotId))
        dispatch(spotsActions.detailThunk(spotId))
    }, [dispatch, spotId])


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
                    <img className="box-one" src={spot.SpotImages[1].url} />
                    <img className="box-two" src={spot.SpotImages[2].url} />
                    <img className="box-three" src={spot.SpotImages[3].url} />
                    <img className="box-four" src={spot.SpotImages[4].url} />
                </div>
            </div>
            <div className="info">
                <div className="profile">
                    <div className="owner">
                        {spot.Owner.firstName}, {spot.Owner.lastName}
                    </div>
                </div>
                <div className="spot-info">
                    <div className="guests">5 guests</div>
                    <div className="split">·</div>
                    <div className="bedrooms">5 bedrooms</div>
                    <div className="split">·</div>
                    <div className="beds">5 beds</div>
                    <div className="split">·</div>
                    <div className="baths">3 baths</div>
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
            <div className="stars">
                <i class="fa fa-star"></i>{spot.numReviews} reviews
            </div>
            <div className='spotrevs'>
                {reviews && Object.values(reviews).length > 0 ? Object.values(reviews).map((review) => (
                    <SpotRevs key={`${review.id}`} review={review} spot={spot} />
                )): <p>No reviews</p>}
            </div>
            <div className="create-rev">
                {user && spot.Owner.id !== user.id && (<NavLink className='link-to-create' to={`/spots/${spotId}/reviews/newreview`}>Leave A Review</NavLink>)}
            </div>
        </div>
    )
    
}