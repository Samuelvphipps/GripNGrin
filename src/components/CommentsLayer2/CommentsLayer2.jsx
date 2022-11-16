

function CommentsLayer2({comment2}){

    return(
        <div className="commentl2">
            <p>{comment2.username} {comment2.created}</p>
            <p>{comment2.content}</p>
        </div>
    );
}


export default CommentsLayer2