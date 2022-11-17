import { useDispatch } from "react-redux";
import { login } from "../../store/session";

export const AutoLogin = () => {
    const dispatch = useDispatch()
    const loginWfaker = () => {
        dispatch(login({credential: 'Demo-lition', password: 'password'}))
    }
    return(
        <button onClick={loginWfaker}>auto log</button>
    )
}