import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    
    <div className="nav">
        
        <h3 className="nav-title">{user.username}</h3>
        <LogOutButton className="navLink" />

      <Link to="/home">
        <h2 className="nav-title">Grip N Grin</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>

            <Link className='navLink' to='/newpost'>
                <button>Post Hunt</button>
            </Link>


            <Link className="navLink" to="/home">
              Home
            </Link>


            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}

            
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
