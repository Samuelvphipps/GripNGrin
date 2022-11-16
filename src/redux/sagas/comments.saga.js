import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


//Add post saga

//route is '/api/comments'//

//add comment and post to DB
function* addComment(action){
    // console.log('in addComment Saga');


    try{
        //post comment to server
        yield axios.post('/api/comments', action.payload);

        
    } catch {
        console.error('in commentsSaga error');
    }
};

function* fetchComments(action) {
    console.log('in fetchComments SAGA and payload is:', action.payload);

    try{
        const comments = yield axios.get(`/api/comments/${action.payload}`);
        console.log('comments retrieved from server in SAGA are:', comments.data);
    } catch{
        console.error('in fetchComments SAGA error');
    }

}

function* commentsSaga() {
    //add comment
    yield takeEvery('ADD_COMMENT', addComment);

    //fetchComments
    yield takeEvery('FETCH_COMMENTS', fetchComments);


}

export default commentsSaga;