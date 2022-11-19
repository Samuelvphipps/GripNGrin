//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { useDispatch, useSelector } from 'react-redux';


import CommentsLayer2 from '../CommentsLayer2/CommentsLayer2';
import ReplyToggle from '../ReplyToggle/ReplyToggle';
import CommentEditToggle from '../CommentEditToggle/CommentEditToggle';

function CommentItem ({comment, post, comments}){

    //dispatch setup
    const dispatch = useDispatch();

    //get user info for 
    const user = useSelector(store => store.user);
    // console.log('comment', comment);

    //setup comment deletion function to send through props

    const deleteComment = (id) => {
        console.log('in delete comment with an id of:', id);

            //delete the comment chosem. includes coment id, post id, and userid (for server side verification)
        dispatch({
            type: 'DELETE_COMMENT',     //grab post id to send the fetch comments request
            payload: {comment_id: id, post_id: post.id, user_id: user.id}
        })
    };

    //function takes in comments id, the updated content and the user id (used to validate info on server side)
    const editComment = (id, content, userId) => {
        console.log('in edit comment with an id of:', id, 'and content of:', content, 'user owner id:', userId);
        
        //dispatch to saga for the axios put
        dispatch({
            type: 'UPDATE_COMMENT',
            payload: {comment_id: id, comment_content: content, user_id:userId, post_id:post.id}
        })
    }

    return(
        <>      
                {/* if the comment has a parent_id it isn't rendered here because its not a parent comment itslef */}
                { comment.parent_comment_id ? null :
                    <CommentEditToggle 
                        editComment={editComment} 
                        deleteComment={deleteComment} 
                        user={user} 
                        post={post} 
                        comment={comment} />
                }           
                {/* go to second layer comments where the comments have this comment as 
                a parent comment 
                TODO - get rid of the middleman component that survived editing*/}
                {comments.map(comment2 =>{
                    if(comment.id === comment2.parent_comment_id){
                    return <CommentsLayer2 
                        user={user} 
                        deleteComment = {deleteComment}
                        editComment ={editComment}
                        key={comment2.id} 
                        comment2={comment2}/>}
                    else {return};
                })}
        
            <ReplyToggle comment={comment} />
        </>
    );
}


export default CommentItem;