//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function CommentEditToggle({user, post, deleteComment, comment, editComment}){

    const [editOpen, setEditOpen] = useState(false);

    const [content, setContent] = useState(comment.content)

    //returns buttons and text field for an edit on selected comment
    if(editOpen){
        return(
                <>
                    <p>{comment.username} {comment.created}</p>
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
                <><p>{comment.username} {comment.created}</p>
                <p>{comment.content}</p></>
            
                {/* if the user owns the  comment the buttons are here and allow the user to delete or edit the post*/}
                {(user.id===comment.user_id) ?
                    <>
                    {/* OPENS TOGGLE above to allow an edit field and submittal */}
                    <Button variant="text" onClick={()=>setEditOpen(true)}>Edit</Button>
                    {/* calls the delete comment with id info */}
                    <Button  onClick={()=>deleteComment(comment.id)} variant="text">Delete</Button>
                    </>
                    :
                    null
                }
        </>

        );
    }
};

export default CommentEditToggle;