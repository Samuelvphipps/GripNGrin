//mui
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import CommentItem from "./CommentItem/CommentItem";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './comments.css';


 

function CommentList ({post}) {
    //set up useDispatch
    const dispatch = useDispatch();

    // console.log('post id is:', post);

    //get post's comments from reducer
    const comments = useSelector(store => store.comments.commentsReducer);

    // console.log('commentsreducer redux store in list:', comments);

    //local state for a new comment value prior to dispatch
    const [comment, setComment] = useState('');


    const newComment = (evt) => {
        //prevent default
        evt.preventDefault();
        console.log('In newComment and text says:', comment);

        //dispatch the new comment to saga
        //send null for parent id since this is a parent comment input
        dispatch({
            type: 'ADD_COMMENT',
            payload: {
                post_id: post.id,
                comment: comment,
                parent_comment_id: null
            }
        });
        setComment('')
    }


    return(
        <>
            <h1>Leave a comment!</h1>
                <div>
                    {/* render comments individually */}
                    {comments.map(comment => {
                        return <CommentItem 
                            post={post}
                            key={comment.id} 
                            comment={comment}
                            comments={comments}
                        />;
                    })}
                </div>

            <form onSubmit={newComment}>
                <h3 className='newCommentHeader'>New Comment:</h3>
                <textarea
                onChange={(evt)=>setComment(evt.target.value)}
                value={comment}
                className='newCommentField'
                required></textarea>
                <button type='submit' className="submitBtn">Comment</button>
            </form>
        </>
    )
}

export default CommentList;