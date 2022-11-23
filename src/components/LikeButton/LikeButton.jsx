
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IconButton, Grid} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


function LikeButton({user, post, selectedId}){
    //dispatch setup
    const dispatch =useDispatch();
    const history = useHistory()
    const userLikes = useSelector(store => store.likes.userLikesReducer)
    //GET all likes to check if user likes the post already

    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_LIKES'
        });
        
        dispatch({
            type: 'FETCH_SELECTED_POST',
            payload: selectedId
        });


    }, []);

    // console.log('selectedId', selectedId)

    //on clicking like run a function to dispatch a like to saga => server => db
    //send post id so it can be given into sql and send user.id 
    //so there is serverside verification of who send the post
    const likePost = () => {
        console.log('in like the post with an id of:', post.id, 'and user:', user.id);

        //dispatch info to SAGA for an axios post request
        dispatch({
            type: 'ADD_LIKE',
            payload: {
                post_id: post.id,
                user_id: user.id,
                selectedPost: selectedId
            }
        });

        // if(selectedId){
        //     history.push(`/post/${selectedId}`)
        // };
    }

    const unlikePost = () =>{
        console.log('in unlike post');
        
        //dispatch to remove like
        dispatch({
            type: 'UNLIKE',
            payload: {
                post_id: post.id,
                user_id: user.id,
                selectedPost: selectedId
            }
        });

        //use history push to force a rerender
        // if(selectedId){
        //     history.push(`/post/${selectedId}`)
        // };
    }
    //if user owns the post no button exists
    if(post.user_id === user.id){
        return (
            <Grid container spacing={2}>
                {/* <Grid item sm={.5}></Grid> */}
                <p  className='totalLikes'>{post.likes} Likes</p>
            </Grid>
        )
    }

    //if the user has liked this post before the have an unlike option
    for(let like of userLikes){
        if(post.id===like.post_id){
            return (
                <>
                    <Grid container spacing={2}>
                        {/* <Grid item sm={.5}></Grid> */}                        
                            <p  className='totalLikes'>{post.likes}</p>
                            <Grid item sm={.25}></Grid>
                            <IconButton onClick={unlikePost} style={{ fill: '#0072ea' }}>
                                    <ThumbUpIcon color={'primary'} fontSize='large'/>
                            </IconButton>                        
                    </Grid>        
                </>
            )
        }
    }

    
    return(
        <>  
            <Grid container spacing={2}>
                {/* <Grid item sm={.5}></Grid> */}
                <p className='totalLikes'>{post.likes}</p>
                <Grid item sm={.25}></Grid>
                <IconButton onClick={likePost}>
                    <ThumbUpOffAltIcon color={'primary'} fontSize='large'/>
                </IconButton>
            </Grid>
        </>   
    )
}

export default LikeButton;