import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { delRevThunk, spotRevThunk } from '../../store/reviews';
import { detailThunk } from '../../store/spots';
import './NewRev.css'


export default function SpotRevs({review}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const {spotId} = useParams()
    
    
    const clickDelete = (e) => {
        e.preventDefault()
        dispatch(delRevThunk(review.id))
        .then(() => dispatch(spotRevThunk(spotId)))
        .then(() => dispatch(detailThunk(spotId)))
    }
    

    return (
        <div className='review-container'>
            <div className='icon-user'>
                <div className='icon'><i class="fa-solid fa-circle-user fa-2x"></i></div>
                <div className='fname'>{review.User.firstName}</div>
            </div>
            <div className='yrev'>{review.review}</div>
            {user && review.User.id === user.id && (
                <button className='delete-butt' onClick={clickDelete}>Delete Your Review</button>
                )}
        </div>
    )
}