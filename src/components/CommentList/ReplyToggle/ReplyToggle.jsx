//mui
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Grid } from '@mui/material';


import { useState } from 'react';
import { useDispatch } from 'react-redux';

function ReplyToggle({comment}){

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
            comment: reply,
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
            {/* this is the input area for replies to comments. When reply is clicked it opens a  text box for a new reply on the parent comment */}
                {replyOpen ?
                <form onSubmit={newReply}> 
                <div className='replyCommentTop'></div>                   
                    <Grid container spacing={1}>
                        <Grid container>
                            <textarea className='replyTextArea'
                                onChange={(evt)=>setReply(evt.target.value)}
                                value={reply}                                
                                required>                            
                            </textarea>
                        </Grid>
                        <Grid container>
                            <button className='cancelCommentBtn' onClick={()=>setReplyOpen(false)}>Cancel</button>
                            <button type='submit' className='submitCommentBtn' name="postComment">Reply</button>
                        </Grid>
                    </Grid>
                </form> :
                <button className='replyBtn' onClick={()=>setReplyOpen(true)}>Reply</button>}
            </>
    )}
    else { return null};


}



export default ReplyToggle;