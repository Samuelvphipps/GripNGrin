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

        
    } catch (err) {
        console.error('in commentsSaga error and error is:', err);
    }
};

function* fetchComments(action) {
    console.log('in fetchComments SAGA and payload is:', action.payload);

    try{
        const comments = yield axios.get(`/api/comments/${action.payload}`);

    } catch (err){
        console.error('in fetchComments SAGA error and error is:', err);
    }

}

function* commentsSaga() {
    //add comment
    yield takeEvery('ADD_COMMENT', addComment);

    //fetchComments
    yield takeEvery('FETCH_COMMENTS', fetchComments);


}

export default commentsSaga;