
import CommentsLayer2 from '../CommentsLayer2/CommentsLayer2';
import CommentToggle from '../CommentToggle/CommentToggle';

function CommentItem ({comment, comments}){


    return(
        <>
            <div>
                { comment.parent_comment_id ? <></> :
                <><p>{comment.username} {comment.created}</p>
                <p>{comment.content}</p></>
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