import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function PostDetails(){

    useEffect(()=>{
        //send id to saga
        //get the selected post information! ⬇️
        dispatch({
            type: 'FETCH_SINGLE_POST',
            payload: params.id
        });
        //set the params id here so if the url switches use effect re-runs and gets the new post by id
    }, [params.id]);

    
    return(
        <h1>In Post details</h1>
    )
};


export default PostDetails;