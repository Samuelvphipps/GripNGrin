//mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import CommentEditToggle from '../CommentEditToggle/CommentEditToggle';

function CommentsLayer2({comment2, user, deleteComment, editComment}){

        // console.log('user in comment2', user);

    
    
    return(
        //call in the comment edit toggle bit
        //TODO climb back one layer as this is redundant and happend through edits
        <div className="commentl2">
                <CommentEditToggle 
                    comment={comment2}
                    user={user}
                    deleteComment={deleteComment}
                    editComment={editComment}
                />
        </div>
    );
}


export default CommentsLayer2