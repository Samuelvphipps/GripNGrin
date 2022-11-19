//mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './PostItems.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LikeButton from '../LikeButton/LikeButton';


function PostItems({post}){

    //use History setup
    const history = useHistory();
    const dispatch = useDispatch();

    //get user information for conditional render
    const user = useSelector(store => store.user);
    // console.log('individual post information logged:', post);

    //Delete selected post information
    const deletePost = () => {
        // console.log('in deletePost with id of', post.id);
        //dispatch delete request to saga
        dispatch({
            type:'DELETE_POST',
            payload: {post_id: post.id, user_id: post.user_id}
        });
        
    };
    
    const pushToDetails = () => {
        console.log('in pushtodetails fn')
        history.push(`/post/${post.id}`)
    };


    return(
        <li>
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
                    <p className='postContent' onClick={pushToDetails}>{post.content.substring(0, 240) + '...'}</p>
                </div>
                <LikeButton 
                    post={post}
                    user={user}
                />

            </article>
        </li>
    )
}

export default PostItems;