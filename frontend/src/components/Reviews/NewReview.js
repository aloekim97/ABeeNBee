import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createRevthunk } from "../../store/reviews";
import { detailThunk } from "../../store/spots";
import './NewRev.css'


export default function NewReview() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()

    // useEffect(() => {
    //     dispatch(detailThunk(spotId))
    // },[spotId])

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1)
    const [errors, setErrors] = useState('')

    const user = useSelector(state => state.session.user)

    if(!user) <Redirect to='/' />

    const onSub = (e) => {
        e.preventDefault();

        if(stars < 1 || stars > 5) setErrors('Stars must be between 1 and 5')

        if(errors.length) return

        const input = {
            review,
            stars
        }
        console.log(input, spotId)
        return dispatch(createRevthunk(input, spotId))
            .then(() => {
                setReview('')
                setStars(1)
                history.push(`/spots/${spotId}`)
            })
            .catch (
                async (res) => {
                const data = await res.json()
                if (data && data.message) {
                    setErrors(data.message)
                }
                if(data && data.errors) {
                    setErrors(data.errors)
                }
            }
        )
    }

    return(
        <div className="rev-container">
            <form className="leave-rev" onSubmit={onSub}>
                <h1>Leave a review</h1>
                <ul className="errors">
                    {errors && <li key={errors}>{errors}</li>}
                </ul>
                <label>
                    <textarea className="review-inputs"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    placeholder='Leave a review'
                    required
                    />
                </label>
                <label>Stars:
                    <input className="star-input"
                    type='number'
                    value={stars}
                    min={1}
                    max={5}
                    onChange={e => setStars(e.target.value)}
                    placeholder='Star Rating'
                    required
                    />
                </label>
                <button className="submit" type="submit">Submit</button>
            </form>
        </div>
    )
}