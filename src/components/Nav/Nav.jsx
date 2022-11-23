import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    
        
        <Grid container className="nav" spacing={2}>
            {/* <Grid item sm={}></Grid> */}
            <Grid item sm={4}>
                {user.username &&<h3 className="nav-title">Welcome {user.username}</h3>}
            </Grid>
            
    
            <Grid item sm={4}>
                <Link to="/home">
                <h2 className="nav-title">Grip N Grin</h2>
                </Link>
            </Grid>
                
                   <Grid item id='rightNavItems' sm={4}>
                        {/* If no user is logged in, show these links */}
                        {!user.id && (
                            // If there's no user, show login/registration links
                            <Link className="navLink" to="/login">
                            Login / Register
                            </Link>
                        )}
        
                        {/* If a user is logged in, show these links */}
                        {user.id ? (
                            <>
        
                            <Link className='navLink' to='/newpost'>
                                Post Hunt
                            </Link>
        
        
                            <Link className="navLink" to="/home">
                                Home
                            </Link>
        
                            <LogOutButton className="navLink" />
        
                            {/* <Link className="navLink" to="/info">
                                Info Page
                            </Link> */}
                            </>
                        )
                        :
                        null
                        }
        
                        <Link className="navLink" to="/about">
                            About
                        </Link>
                   </Grid>
                
        </Grid >
    
  );
}

export default Nav;
