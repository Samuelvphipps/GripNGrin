//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';

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
                    <Button onClick={()=>{editComment(comment.id, content, comment.user_id), setEditOpen(false)}}>Submit</Button>
                    {/* on cancel reset toggle */}
                    <Button onClick={()=>setEditOpen(false)}>Cancel</Button>
                </>
        )
    }
    else{    
        // if toggle isnt engaged show this
    return(
        <>
                <><p><span className='commentUserName'>{comment.username}</span>  
                <span className='commentDate'>{moment(comment.created).format("MMM Do YYYY")}</span></p>
                <p className='commentContent'>{comment.content}</p></>
            
                {/* if the user owns the  comment the buttons are here and allow the user to delete or edit the post*/}
                {(user.id===comment.user_id) ?
                    <>
                    {/* OPENS TOGGLE above to allow an edit field and submittal */}
                    <button className='editBtnComment' type="text" onClick={()=>setEditOpen(true)}>Edit</button>
                    {/* calls the delete comment with id info */}
                    <button className='deleteBtnComment' onClick={()=>deleteComment(comment.id)} type="text">Delete</button>
                    </>
                    :
                    null
                }
        </>

        );
    }
};

export default CommentEditToggle;