import Nav from "../Nav/Nav";
import PostList from "../PostList/PostList";
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';


function Home(){

    //set up dispatch
    const dispatch=useDispatch();

    useEffect(()=>{
        //GET POSTS FROM SERVER
        dispatch({
            type: 'FETCH_POSTS',
        });
        
    }, []);

    return(
        <>
            <h1> IN HOME </h1>
            <PostList />
        </>
    );
}


export default Home;