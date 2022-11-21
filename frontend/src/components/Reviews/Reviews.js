import {useDispatch, useSelector} from 'react-redux'
import { delRevThunk } from '../../store/reviews';
import { detailThunk } from '../../store/spots';
import './NewRev.css'


export default function SpotRevs({review, spot}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    

    const clickDelete = () => {
        dispatch(delRevThunk(review.id))
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