//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function CommentsLayer2({comment2, user, deleteComment}){

        // console.log('user in comment2', user);

    
    
    return(
        <div className="commentl2">
            <p>{comment2.username} {comment2.created}</p>
            <p>{comment2.content}</p>
            { user.id===comment2.user_id ?
                <>
                    <Button variant="text">Edit</Button>
                    <Button  onClick={()=>deleteComment(comment2.id)} variant="text">Delete</Button>
                </>
                                :
                                null
                            }
        </div>
    );
}


export default CommentsLayer2