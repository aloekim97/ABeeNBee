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
    }

    return (
        <div className='review-container'>
            <div>{review.User.firstName}</div>
            <div>{review.review}</div>
            {user && review.User.id === user.id && (
                    <button className='review-button' onClick={clickDelete}>Delete <i className="fa-solid fa-trash"></i></button>
                )}
        </div>
    )
}