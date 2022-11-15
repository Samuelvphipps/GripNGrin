import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//IMPORT FORM DATA FOR FILE SEND
import FormData from 'form-data';

//Add post saga
function* addPost(action) {
    console.log('in addPost saga with payload of:', action.payload);
    //create payload object
    let data=action.payload;
    //new formdata for payload to multer and router
    let formData = new FormData();
    // formData.append('post_img', data.image);
    // formData.append('date', data.date);
    // formData.append('huntArea', data.huntArea);
    // formData.append('',)
    // formData.append('',)
    // formData.append('',)
    // formData.append('',)
}

//fetch hunt areas
function* fetchHuntAreas(){
    console.log('in fetchHuntArea SAGA');

    //get huntareas from server
    try{

    } catch (err){
        //catch error
        console.error('in fetchHuntAreas SAGA error:', err);
    }


}

function* postSaga() {
  yield takeEvery('ADD_POST', addPost);

  yield takeEvery('FETCH_HUNT_AREAS', fetchHuntAreas)
}

export default postSaga;