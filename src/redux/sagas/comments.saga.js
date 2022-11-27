import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//Add post saga

//route is '/api/comments'//

//add comment and post to DB
function* addComment(action){
    // console.log('in addComment Saga');
    try{
        //post new comment to server
        yield axios.post('/api/comments', action.payload);
        console.log('action.payload in post', action.payload);
        //get updated comments for this post
        yield put({
            type: 'FETCH_COMMENTS',
            payload: action.payload.post_id,
        });
        
    } catch {
        console.error('in commentsSaga error');
    }
};

function* fetchComments(action) {
    // console.log('in fetchComments SAGA and payload is:', action.payload);
    try{
        //get comments from server (DB) using individual post id
        const comments = yield axios.get(`/api/comments/${action.payload}`);
        // console.log('comments retrieved from server in SAGA are:', comments.data);

        //send response to redux store
        yield put({
            type: 'SET_COMMENTS',
            payload: comments.data
        });

    } catch{
        console.error('in fetchComments SAGA error');
    }

};

function* deleteComment(action){
    // console.log('in deleteComment SAGA');
    // console.log('in delete comment with data of:', action.payload);
    try{
        //send delete request with comment id
        yield axios.delete(`/api/comments/`, {
            params: action.payload
        });

        //get updated comment list which triggers rerender
        yield put({
            type: 'FETCH_COMMENTS',
            payload: action.payload.post_id,
        });

    } catch {
        console.error('in deleteComment SAGA error');
    }
}

function* updateComment(action){
    // console.log('in updateComment SAGA with payload of:', action.payload);
    try{
        //send updated content to database through the data
        //user verification in server to make sure they own the comment serverside
        //update sent via put request with a data payload
        yield axios.put('/api/comments', {
            data: action.payload
        })
        //refetch comments for rerender
        yield put({
            type: 'FETCH_COMMENTS',
            payload: action.payload.post_id
        })
    } catch {
        console.error('in updateComment SAGA error');
    }
}

function* commentsSaga() {
    //add comment
    yield takeEvery('ADD_COMMENT', addComment);

    //fetchComments
    yield takeEvery('FETCH_COMMENTS', fetchComments);

    //delete comment
    yield takeEvery('DELETE_COMMENT', deleteComment);

    //Update comment
    yield takeEvery('UPDATE_COMMENT', updateComment);

}

export default commentsSaga;