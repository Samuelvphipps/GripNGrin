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

    //get comments from reducer
    const comments = useSelector(store => store.comments.commentsReducer);

    // console.log('commentsreducer redux store in list:', comments);

    //local state for comment
    const [comment, setComment] = useState('');


    const newComment = (evt) => {
        //prevent default
        evt.preventDefault();
        console.log('In newComment and text says:', comment);

        //dispatch to saga
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
            <h1>Comments component</h1>
                <div>
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
                <InputLabel>New Comment</InputLabel>
                <TextareaAutosize 
                onChange={(evt)=>setComment(evt.target.value)}
                value={comment}
                style={{ width: 400, height:100 }} 
                required></TextareaAutosize>
                <Input type='submit' name="postComment" />
            </form>
        </>
    )
}

export default CommentList;