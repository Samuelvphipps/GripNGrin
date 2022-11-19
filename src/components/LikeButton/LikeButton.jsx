
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function LikeButton({user, post}){


    //SET TOGGLE STATE
    
    //dispatch setup
    const dispatch =useDispatch();

    const userLikes = useSelector(store => store.likes.userLikesReducer)
    //GET all likes to check if user likes the post already
    // console.log('userLikes', userLikes)

    useEffect(() => {
        dispatch({
            type: 'FETCH_USER_LIKES'
        });
    }, []);



    // console.log('liked bool =', liked);


    //conditional to check if user owns the post or has liked the post before


    
    //on clicking like run a function to dispatch a like to saga => server => db
    //send post id so it can be given into sql and send user.id 
    //so there is serverside verification of who send the post
    const likeThePost =() => {
        console.log('in like the post with an id of:', post.id, 'and user:', user.id);

        //dispatch info to SAGA for an axios post request
        dispatch({
            type: 'ADD_LIKE',
            payload: {
                post_id: post.id,
                user_id: user.id
            }
        })
    }
    
    if(post.user_id === user.id){
        return <></>
    }

    for(let like of userLikes){
        if(post.id===like.post_id){
            return <p>liked</p>
        }
    }

    
    return(
        <>  
                    <button onClick={likeThePost}>Like</button>
        </>   
    )
}

export default LikeButton;