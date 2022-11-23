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
        //GET POSTS FROM SERVER
        dispatch({
            type: 'FETCH_POSTS',
        });
    }, []);

    //grab the post list
    return(
        <>
   
                
                <header>
                    <h1 className='pageHeader'> Recent Hunts </h1>
                    <button className="newHuntBtn" onClick={()=>history.push('/newpost')}>POST A HUNT!</button>
                </header>
            
            <PostList />
        </>
    );
}


export default Home;