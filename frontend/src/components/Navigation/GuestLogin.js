import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import './ProfileButton.css'

export const AutoLogin = () => {
    const dispatch = useDispatch()
    const loginWfaker = () => {
        dispatch(login({credential: 'Demo-lition', password: 'password'}))
    }
    return(
        <button className="auto" onClick={loginWfaker}>auto log</button>
    )
}