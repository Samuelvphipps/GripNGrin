//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


function CommentEditToggle({user, post, comment}){

    const [editOpen, setEditOpen] = useState(false);


    if(editOpen){
        return(
        <div>
                { comment.parent_comment_id ? null :
                <><p>{comment.username} {comment.created}</p>
                <p>{comment.content}</p></>
            }        
        </div>
        )
    }
    else{
    return(
        <div>
                { comment.parent_comment_id ? null :
                <><p>{comment.username} {comment.created}</p>
                <p>{comment.content}</p></>
            }
                {/* if user id matches comment userid and no parent comment id */}
            {(user.id===comment.user_id && !comment.parent_comment_id) ? 
            <>
                <Button variant="text" onClick={()=>setEditOpen(true)}>Edit</Button>
                <Button  onClick={()=>deleteComment(comment.id)} variant="text">Delete</Button>
            </>
            :
            null }
        </div>

        );
    }
};

export default CommentEditToggle;