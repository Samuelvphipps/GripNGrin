//mui
import{
    Button,
    Stack,
    Input,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextareaAutosize,
    Grid
} from '@mui/material';

import CommentEditToggle from '../CommentEditToggle/CommentEditToggle';

function CommentsLayer2({comment2, user, deleteComment, editComment}){

        // console.log('user in comment2', user);

    
    
    return(
        //call in the comment edit toggle bit
        //TODO climb back one layer as this is redundant and happend through edits
        
        <Grid container spacing={2}>
            <Grid item sm={2}>
                
            </Grid>
            <Grid item sm={10}>
                <div className="childComment">
                        <CommentEditToggle 
                            comment={comment2}
                            user={user}
                            deleteComment={deleteComment}
                            editComment={editComment}
                        />
                        <div className='childCommentBottom'></div>
                </div>
            </Grid>
        </Grid>
    );
}


export default CommentsLayer2