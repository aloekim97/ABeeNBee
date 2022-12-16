import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import {AutoLogin} from './GuestLogin'
import './ProfileButton.css';

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div className="rightside">
      <div className="linkss">
        {user ? <NavLink to={'/spots/create'}>
          <button className="other-link">ABeeNBee Your Home</button>
        </NavLink> : <NavLink to={'/login'}><button className="other-link">airbnb your home</button></NavLink>}
      </div>
      <div className="menu">
      <button onClick={openMenu} className="ihatethisbutton">
        <i class='fa fa-bars fa'></i>
        <i class="fa-solid fa-circle-user fa-2x"></i>
      </button>
      <div className="dropdown" >
      {showMenu && ( user ?
        (<div className="profile-dropdown">
          <div className="username">{user.username}</div>
          <div className="email">{user.email}</div>
          <div>
            <NavLink className="create-link" to={'/spots/create'}>
              <button className='create-spot-link' >
                List Your House 
              </button>
            </NavLink>
          </div>
          <div>
            <NavLink className="user-link" to={'/spots/user'}>
              <button className='user-spots' >
                My Spots
              </button>
            </NavLink>
          </div>
          <div className>
            <button onClick={logout} className='logout'>Log Out</button>
          </div>
        </div>) :
        (<div className="profile-dropdown">
          <div>
            <button className="login" onClick={() => {
              setLogin(true)
              setShowModal(true)
            }}>Log In</button>
          </div>
          <div>
            <button className='signup' onClick={() => {
              setLogin(false)
              setShowModal(true)
            }}>Sign Up</button>
          </div>
          <div>
            <AutoLogin />
          </div>
        </div>)
      )}
      </div>
      </div>
      </div>
    </>
  );
}

export default ProfileButton;