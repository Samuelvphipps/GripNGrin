import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../Z_OldComponents/LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Home from '../Home/Home';
import NewPost from '../NewPost/NewPost';
import PostDetails from '../PostDetails/PostDetails';
import EditPost from '../EditPost/EditPost';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* --SHOW THE REGISTRATION PAGE */}
            <Route
            exact
            path="/registration"
            >
            {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/home" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
            }
            </Route>

            {/* --SHOW LOGIN PAGE-- */}
            <Route
            exact
            path="/login"
            >
            {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/home" />
                :
                // Otherwise, show the login page
                <LoginPage />
            }
            </Route>

            {/* --HOME/POSTS HOME */}
            <ProtectedRoute
            exact
            path="/home"
            >
                <Home/>
            </ProtectedRoute>

            {/* --CREATE/POST */}
            <ProtectedRoute
            exact
            path="/newpost"
            >
                <NewPost />
            </ProtectedRoute>


            {/* --POST/DETAILS PAGE--             
                --contains comment and comment edit components--
            */}
          
            <ProtectedRoute
            exact
            path="/post/:id"
            >
                <PostDetails />
            </ProtectedRoute>
            
            {/* edit/ ensure userid verification */}
            <ProtectedRoute
            exact
            path="/post/edit/:id"
            >
                <EditPost />
            </ProtectedRoute>

            {/* --STRETCH: PROFILE PAGE */}



            {/* --STRETCH: PROFILE EDIT */}



            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
            >
            <AboutPage />
            </Route>
            



            {/* <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
            ></ProtectedRoute> */}

            {/* If none of the other routes matched, we will show a 404. */}

                    {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
            >
            <UserPage />
            </ProtectedRoute> */}

            {/* <ProtectedRoute>
            <InfoPage />
            </ProtectedRoute> */}

            <Route>
            <h1>404</h1>
            </Route>

        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
