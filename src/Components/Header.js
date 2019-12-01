import React from 'react';
import { Link } from 'react-router-dom';
import REQUEST_URL from '../Constants/requestUrl';
import stateNames from '../Constants/stateNames';
import './Header.scss';
import './Common.scss';

function Header(props) {
  console.log('in header isLoggedin', props.isLoggedIn);
  const { isLoggedIn, userInfo, resetStateOf } = props;
  const { SELECTED, DICTIONARY, VIDEOS } = stateNames;

  return (
    <div className='Header'>
      <div className='menu-container'>
        {isLoggedIn ? (
          <>
            <Link
              to='/#'
              onClick={() => {
                resetStateOf(SELECTED);
                resetStateOf(VIDEOS);
                resetStateOf(DICTIONARY);
              }}
            >
              HOME
            </Link>
            <Link to='/myWords'>MY WORDS</Link>
            <img
              className='user-profile-image'
              src={userInfo.profile_image_url}
              alt='user'
            />
            <a className='logout-button' href={REQUEST_URL.LOGOUT}>
              LOGOUT
            </a>
          </>
        ) : (
          <>
            <Link
              to='/#'
              onClick={() => {
                resetStateOf(SELECTED);
                resetStateOf(VIDEOS);
                resetStateOf(DICTIONARY);
              }}
            >
              HOME
            </Link>
            <Link to='/login' className='login-button'>
              LOGIN
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
