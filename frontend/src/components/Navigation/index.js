import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// One modal for login and signup.
import LoginForm from '../LoginFormModal/LoginForm';
import SignupForm from '../SignupFormPage/SignupForm';
import { Modal } from '../../context/Modal';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [login, setLogin] = useState(true)

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //     <ProfileButton user={sessionUser} />
    //     );
    // } else {
    //     sessionLinks = (
    //         <>
    //         <LoginFormModal />
    //         <SignupFormModal />
    //         </>
    //     );
    // }

    return (
        <div>
            <div className='the-bar'>
                <NavLink exact to="/" className="logo">AIRBNB</NavLink>
                {isLoaded && (
                    <ProfileButton
                        user={sessionUser}
                        setLogin={setLogin}
                        setShowModal={setShowModal}
                        />
                )}
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                {login ? <LoginForm setShowModal={setShowModal}/> : <SignupForm setShowModal={setShowModal}/>}
            </Modal>
            )}
        </div>
    );
}

export default Navigation;


