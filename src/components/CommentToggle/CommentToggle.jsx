//mui
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';


import { useState } from 'react';
import { useDispatch } from 'react-redux';

function CommentToggle({comment}){

    //setup dispatch
    const dispatch = useDispatch();

    //set up toggle for conditional render
    const [replyOpen, setReplyOpen] = useState(false);

    //value for the new comment
    const [reply, setReply] = useState('');

    const newReply = () => {
        console.log('in newReply fn and comment is:', comment);
    
    // dispatch new comment to server with parent_comment_id assigned

    dispatch({
        type: 'ADD_COMMENT',
        payload: {
            post_id: comment.post_id,
            content: reply,
            parent_comment_id: comment.id,
        }
    });

    //close the input
    setReplyOpen(false);
    setReply('');
    }

    if (comment.parent_comment_id === null){
        return(
            <>
                {replyOpen ? <form onSubmit={newReply}>
                    <InputLabel>Reply</InputLabel>
                    <TextareaAutosize 
                    onChange={(evt)=>setReply(evt.target.value)}
                    value={reply}
                    style={{ width: 400, height:100 }} 
                    required></TextareaAutosize>
                    <Input type='submit' name="postComment" />
                </form> :
                <button onClick={()=>setReplyOpen(true)}>reply</button>}
            </>
    )}
    else { return null};


}



export default CommentToggle;