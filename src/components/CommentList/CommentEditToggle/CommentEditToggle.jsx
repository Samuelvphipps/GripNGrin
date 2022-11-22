//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Grid } from '@mui/material';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function CommentEditToggle({user, post, deleteComment, comment, editComment}){

    const [editOpen, setEditOpen] = useState(false);

    const [content, setContent] = useState(comment.content)

    //returns buttons and text field for an edit on selected comment
    if(editOpen){
        return(
                <>
                    <p><span className='commentUserName'>{comment.username}</span> 
                    <span className='commentDate'>{comment.created}</span></p>
                    <TextareaAutosize
                        required
                        style={{ width: 350, height:50 }}
                        value={content} onChange={(evt)=>setContent(evt.target.value)}
                    />                  
                    {/* calls the edit comment function with props to edit it then resets the toggle to false */}
                    <button onClick={()=>{editComment(comment.id, content, comment.user_id), setEditOpen(false)}}>Submit</button>
                    {/* on cancel reset toggle */}
                    <button onClick={()=>setEditOpen(false)}>Cancel</button>
                </>
        )
    }
    else{    
        // if toggle isnt engaged show this
    return(
        <>
                <Grid container spacing={2}>
                    <Grid item sm={9}>
                        <p><span className='commentUserName'>{comment.username}</span>  
                        <span className='commentDate'>{moment(comment.created).format("MMM Do YYYY")}</span></p>
                    </Grid>
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
            
        </>

        );
    }
};

export default CommentEditToggle;