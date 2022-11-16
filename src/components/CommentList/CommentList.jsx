//mui
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import CommentItem from "../CommentItem/CommentItem";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


 

function CommentList ({post}) {
    //set up useDispatch
    const dispatch = useDispatch();

    //get comments information
    useEffect(()=>{
        //fetch comments through SAGA
        dispatch({
            type: 'FETCH_COMMENTS',
            payload: post.id
        });
    }, []);



    //local state for comment
    const [content, setContent] = useState('');
    const [parentCommentId, setParentCommentId] = useState(null);

    const newComment = (evt) => {
        //prevent default
        evt.preventDefault();
        // console.log('In newComment and text says:', comment);

        //dispatch to saga
        dispatch({
            type: 'ADD_COMMENT',
            payload: {
                post_id: post.id,
                content,
                parent_comment_id: parentCommentId
            }
        });
    }


    return(
        <>
            <h1>Comments component</h1>
            <CommentItem />
            <form onSubmit={newComment}>
                <InputLabel>New Comment</InputLabel>
                <TextareaAutosize 
                onChange={(evt)=>setContent(evt.target.value)}
                value={content}
                style={{ width: 400, height:100 }} 
                required></TextareaAutosize>
                <Input type='submit' name="postComment" />
            </form>
        </>
    )
}

export default CommentList;