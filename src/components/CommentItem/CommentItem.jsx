//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { useDispatch, useSelector } from 'react-redux';


import CommentsLayer2 from '../CommentsLayer2/CommentsLayer2';
import CommentToggle from '../CommentToggle/CommentToggle';

function CommentItem ({comment, post, comments}){

    //dispatch setup
    const dispatch = useDispatch();

    //get user info for 
    const user = useSelector(store => store.user);
    // console.log('comment', comment);

    //setup comment deletion function to send through props

    const deleteComment = (id) => {
        console.log('in delete comment with an id of:', id);

        dispatch({
            type: 'DELETE_COMMENT',     //grab post id to send the fetch comments request
            payload: {comment_id: id, post_id: post.id, user_id: user.id}
        })
    }

    return(
        <>
            <div>
                { comment.parent_comment_id ? <></> :
                <><p>{comment.username} {comment.created}</p>
                <p>{comment.content}</p></>
            }
                {/* if user id matches comment userid and no parent comment id */}
            {(user.id===comment.user_id && !comment.parent_comment_id) ? 
            <Stack spacing={2} direction="row">
                <Button variant="text">Edit</Button>
                <Button  onClick={()=>deleteComment(comment.id)} variant="text">Delete</Button>
            </Stack>
            :
            <></> }
                            
            </div>
                {/* go to second layer comments where the comments have this comment as 
                a parent comment */}
                {comments.map(comment2 =>{
                    if(comment.id === comment2.parent_comment_id){
                    return <CommentsLayer2 user={user} 
                    deleteComment = {deleteComment}
                    key={comment2.id} 
                    comment2={comment2}/>}
                    else {return};
                })}
        
            <CommentToggle comment={comment} />
        </>
    );
}


export default CommentItem;