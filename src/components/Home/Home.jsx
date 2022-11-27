import Nav from "../Nav/Nav";
import PostList from "../PostList/PostList";
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import './Home.css';
import {Grid} from '@mui/material'
import { useHistory } from "react-router-dom";

function Home(){

    //set up dispatch
    const dispatch=useDispatch();
    const history = useHistory();

    useEffect(()=>{
        //GET ALL POSTS FROM SERVER
        dispatch({
            type: 'FETCH_POSTS',
        });
    }, []);

    //grab the post list
    return(
        <>
            <header>
                <h1 className='pageHeader'> Recent Hunts </h1>
                {/* button gos to new post page so user can post a hunt */}
                <button className="newHuntBtn" onClick={()=>history.push('/newpost')}>POST A HUNT!</button>
            </header>            
            <Grid container spacing={2}>
                <Grid  item sm={3}>
                    {/* advertisement for remingtons! */}
                    <img className="advertisement" src='http://localhost:3000/images/Advertisement.png'></img>
                </Grid>
                                {/* postlist of all posts (previews) */}
                <Grid item sm={8}><PostList /></Grid>
                <Grid item sm={1}></Grid>
            </Grid>
        </>
    );
}


export default Home;