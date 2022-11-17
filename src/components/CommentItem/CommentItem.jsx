import { useDispatch, useSelector } from 'react-redux';


import CommentsLayer2 from '../CommentsLayer2/CommentsLayer2';
import CommentToggle from '../CommentToggle/CommentToggle';

function CommentItem ({comment, comments}){

    const user = useSelector(store => store.user);

    return(
        <>
            <div>
                { comment.parent_comment_id ? <></> :
                <><p>{comment.username} {comment.created}</p>
                <p>{comment.content}</p></>
            }
            { user.id===comment.user_id ?
                                <Stack spacing={2} direction="row">
                                    <Button variant="text">Edit</Button>
                                    <Button onClick={deletePost} variant="text">Delete</Button>
                                </Stack>
                                :
                                null
                            }
            </div>
            
                {comments.map(comment2 =>{
                    if(comment.id === comment2.parent_comment_id){
                    return <CommentsLayer2 key={comment2.id} comment2={comment2}/>}
                    else {return};
                })}
        
            <CommentToggle comment={comment} />
        </>
    );
}


export default CommentItem;