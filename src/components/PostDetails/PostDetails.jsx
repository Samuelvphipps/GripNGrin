//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';

function PostDetails(){

    //setup useParams and useDispatch
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    //useSelecter to get singlepost from redux and user from redux
    const post = useSelector(store => store.posts.selectedPostReducer);
    const user = useSelector(store => store.user);
    // console.log('selected post is:', selectedPost);

    useEffect(()=>{
        //send id to saga
        //get the selected post information! ⬇️
        dispatch({
            type: 'FETCH_SELECTED_POST',
            payload: params.id
        });

            
        //set the params id here so if the url switches use effect re-runs and gets the new post by id
    }, [params.id]);

    const deletePost = () => {
        // console.log('in deletePost with id of', post.id);
        //dispatch delete request to saga
        dispatch({
            type:'DELETE_POST',
            payload: {post_id: post.id, user_id: post.user_id}
        });

       

        history.push('/home');

    // console.log('post:', post);
    }

    console.log('in single post with post of:', post);

    if(post.id != params.id){
        history.push('/home');
    }
    
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
                        { user.id===post.user_id ?
                                <Stack spacing={2} direction="row">
                                    <Button variant="text">Edit</Button>
                                    <Button onClick={deletePost} variant="text">Delete</Button>
                                </Stack>
                                :
                                null
                            }
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