import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createRevthunk } from "../../store/reviews";
import { detailThunk } from "../../store/spots";
import './NewRev.css'
import StarRating from "./Star";


export default function NewReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1)
    const [errors, setErrors] = useState('')

    const user = useSelector(state => state.session.user)


    const onSub = async (e) => {
        e.preventDefault();

        const err=[];
        if(!review.length) err.push('Please leave a review')
        
        setErrors(err)
        if(errors.length) return


        const input = {
            review,
            stars
        }

        await dispatch(createRevthunk(input, spotId))
        await history.push(`/spots/${spotId}`)
    }

    return(
        <div className="rev-container">
            <form className="leave-rev" onSubmit={onSub}>
                <h1 className="list">Leave a review</h1>
                <ul className="errors">
                    {errors && <li key={errors}>{errors}</li>}
                </ul>
                <label className="revbox">
                    <textarea className="writerev"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    placeholder='Leave a review'
                    required
                    />
                </label>
                <label className="leavestar">
                    < StarRating
                    value={stars}
                    onChange={e => setStars(e.target.value)}
                    required
                    />
                </label>
                <button className="create-submit-button" type="submit">Submit</button>
            </form>
        </div>
    )
}