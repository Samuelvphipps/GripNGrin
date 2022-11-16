import CommentItem from "../CommentItem/CommentItem";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
 

function CommentList () {


    

    return(
        <>
            <h1>Comments component</h1>
            <CommentItem />
        </>
    )
}

export default CommentList;