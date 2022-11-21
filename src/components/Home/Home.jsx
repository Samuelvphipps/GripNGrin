import Nav from "../Nav/Nav";
import PostList from "../PostList/PostList";
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import './Home.css';

function Home(){

    //set up dispatch
    const dispatch=useDispatch();

    useEffect(()=>{
        //GET POSTS FROM SERVER
        dispatch({
            type: 'FETCH_POSTS',
        });
    }, []);

    //grab the post list
    return(
        <>
            <h1 className='pageHeader'> Recent Hunts </h1>
            <PostList />
        </>
    );
}


export default Home;