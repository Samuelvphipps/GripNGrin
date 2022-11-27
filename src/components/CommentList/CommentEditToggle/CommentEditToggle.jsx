//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Grid } from '@mui/material';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function CommentEditToggle({user, post, deleteComment, comment, editComment}){

    // edit toggle, controls whether edit field or content is shown
    const [editOpen, setEditOpen] = useState(false);

    //used to store new comment state
    //TODO switch this to a redux edit process
    const [content, setContent] = useState(comment.content)

    //returns buttons and text field for an edit on selected comment
    if(editOpen){
        // when edit is true show this, which contains an edit text field with a cancel button
        return(
                <>
                    <p><span className='commentUserName'>{comment.username}</span> 
                    <span className='commentDate'>{moment(comment.created).format("MMM Do YYYY")}</span></p>
                    <Grid container spacing={1}>
                       <Grid container>
                            <Grid item sm={8}>
                                <textarea className='editCommentTextArea'
                                    required
                                    // style={{ width: 350, height:50 }}
                                    //as input changes change the usestate value and value in field
                                    value={content} onChange={(evt)=>setContent(evt.target.value)}
                                />
                            </Grid>
                       </Grid>                  
                        <Grid container>
                            <Grid item sm={5}></Grid>
                            {/* on cancel reset toggle */}
                            <Grid item sm={5}>
                                <button className='cancelCommentBtn' onClick={()=>setEditOpen(false)}>Cancel</button>
                                {/* calls the edit comment function with props to edit it then resets the toggle to false */}
                                <button className='submitCommentBtn' onClick={()=>{editComment(comment.id, content, comment.user_id), setEditOpen(false)}}>Submit</button>
                            </Grid>
                            <Grid item sm={2}></Grid>
                        </Grid>
                    </Grid>
                </>
        )
    }
    else{    
        // if toggle isnt engaged show this with all comment content. when edit btn is clicked toggle switches to edit mode
    return(
        
                <div className='commentHeader'>
                    <Grid container spacing={2}>
                        <Grid item sm={9}>
                            <p><span className='commentUserName'>{comment.username}</span>  
                            <span className='commentDate'>{moment(comment.created).format("MMM Do YYYY")}</span></p>
                        </Grid>
                        {/* if the user owns the comment allow them to edit and delete the comment */}
                        {(user.id===comment.user_id) ?
                            
                            <Grid item sm={3}>
                                {/* OPENS TOGGLE above to allow an edit field and submittal */}
                                <button className='editBtnComment' type="text" onClick={()=>setEditOpen(true)}>Edit</button>
                                {/* calls the delete comment with id info */}
                                <button className='deleteBtnComment' onClick={()=>deleteComment(comment.id)} type="text">Delete</button>
                            </Grid>
                            
                            :
                            <Grid item sm={3}></Grid>
                        }
                    </Grid>
                        <p className='commentContent'>{comment.content}</p>
                </div>
            
        

        );
    }
};

export default CommentEditToggle;