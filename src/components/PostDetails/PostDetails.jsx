//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentList from '../CommentList/CommentList';
import LikeButton from '../LikeButton/LikeButton';

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

        dispatch({
            type: 'FETCH_COMMENTS',
            payload: params.id
        })
            
        //set the params id here so if the url switches use effect re-runs and gets the new post by id
    }, [params.id]);

    const deletePost = () => {
        // console.log('in deletePost with id of', post.id);
        //dispatch delete request to saga
        dispatch({
            type:'DELETE_POST',
            payload: {post_id: post.id, user_id: post.user_id}
        });

        // console.log('selected post:', post);
       
        //after delete head home
        history.push('/home');

    // console.log('post:', post);
    }

    // console.log('in single post with post of:', post);
  
    //if they change url params to a post id that doesnt exist anymore (i.e. deleted they will see 404)
    // TODO = figure out how to redirect home without causing doubleclick async problem on home page
    if(!post.id){
        return <h1>404 Page Not Found</h1>;
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
                                    <Button onClick={()=>history.push(`/post/edit/${post.id}`)} variant="text">Edit</Button>
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
        <LikeButton 
            post={post}
            user={user}
            selectedId={params.id}
        />

    </article>
    <CommentList post={post}/>
    </>
    );
};


export default PostDetails;