import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
//IMPORT FORM DATA FOR FILE SEND
import FormData from 'form-data';



//ROUTE: /api/editPosts

//fetch the post to edit
function* fetchEditPost(action){
    console.log('in fetchEditPost SAGA with payload of:', action.payload);

    try {
       const editPost = axios.put(`/api/editPosts/${action.payload}`);

    } catch (err){
        console.error('in fetch Edit Post SAGA Error', err);
    }

}

function* editPostsSaga() {
  yield takeLatest('FETCH_EDIT_POST', fetchEditPost);
}

export default editPostsSaga;