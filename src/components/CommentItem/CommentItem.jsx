import { useState } from 'react';
import { useDispatch } from 'react-redux';

function CommentItem ({comment}){


    //setup dispatch
    const dispatch = useDispatch();

    //set up toggle for conditional render
    const [replyOpen, setReplyOpen] = useState(false);

    return(
        <h3>Comment item component</h3>
    );
}


export default CommentItem;