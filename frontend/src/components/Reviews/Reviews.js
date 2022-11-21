import {useDispatch, useSelector} from 'react-redux'
import { delRevThunk } from '../../store/reviews';
import { detailThunk } from '../../store/spots';
import './NewReview.css'


export default function SpotRevs({review, spot}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    

    const clickDelete = (e) => {
        e.preventDefault();
        dispatch(delRevThunk(review.id)).then(() => dispatch(detailThunk(spot.id)))
    }

    return (
        <div className='review-card'>
            <div className='reviewer-name'>{review.User.firstName}:</div>
            <div className='the-rev'>{review.review}</div>
            {(user && user.id === review.User.id) && (
            <button className='del-butt' onClick={clickDelete}>Delete</button>
            )}
            
        </div>
    )
}