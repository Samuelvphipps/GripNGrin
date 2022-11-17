//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function CommentEditToggle({user, post, deleteComment, comment}){

    const [editOpen, setEditOpen] = useState(false);

    const [content, setContent] = useState(comment.content)

    if(editOpen){
        return(
        <div>
                
                <><p>{comment.username} {comment.created}</p>
                <TextareaAutosize
                    required
                    style={{ width: 350, height:50 }}
                    value={content} onChange={(evt)=>setContent(evt.target.value)}
                />
                <Button>Submit</Button>
                <Button onClick={()=>setEditOpen(false)}>Cancel</Button>
                </>
                   
        </div>
        )
    }
    else{
    return(
        <div>
                <><p>{comment.username} {comment.created}</p>
                <p>{comment.content}</p></>
            
                {/* if user id matches comment userid and no parent comment id */}

                <Button variant="text" onClick={()=>setEditOpen(true)}>Edit</Button>
                <Button  onClick={()=>deleteComment(comment.id)} variant="text">Delete</Button>
           
        </div>

        );
    }
};

export default CommentEditToggle;