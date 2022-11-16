//mui
import Button from '@mui/material/Button';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';

function PostDetails(){

    //setup useParams and useDispatch
    const params = useParams();
    const dispatch = useDispatch();

    //useSelecter to get singlepost from redux
    const post = useSelector(store => store.posts.selectedPostReducer);
    // console.log('selected post is:', selectedPost);

    useEffect(()=>{
        //send id to saga
        //get the selected post information! ⬇️
        dispatch({
            type: 'FETCH_SELECTED_POST',
            payload: params.id
        });

            //fetch comments through SAGA
            dispatch({
            type: 'FETCH_COMMENTS',
            payload: params.id
        });
        //set the params id here so if the url switches use effect re-runs and gets the new post by id
    }, [params.id]);

    // console.log('post:', post);
    
    return(
        <>
        <article >
        <div className='postBox'>
            <div>
                <div className="imgContainer">
                    <img src={post.picture}/>
                </div>
            </div>
            <div className='bodyBox'>
                <div>
                    <div className='titleRow'>
                        <h3>{post.title}</h3>
                        <p>{post.username}</p>
                        <p>{post.created}</p>
                    </div>
                </div>
                <div className='dataContainer'>
                    <div>
                        <p>Date of hunt: {post.date_of_hunt}</p>
                        <p>Species: {post.species}</p>
                        <p>Success: {post.success ? <>Yes</> : <>No</>}</p>
                    </div>
                    <div>
                        <p>Location: {post.hunt_area}</p>
                        <p>Weapon used: {post.weapon_type}</p>
                        <p>Land Type: {post.land_type}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <p className='postContent' >{post.content}</p>
        </div>
        <button>LIKE!</button>
    </article>
    <CommentList post={post}/>
    </>
    );
};


export default PostDetails;