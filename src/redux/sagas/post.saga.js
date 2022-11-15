import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//IMPORT FORM DATA FOR FILE SEND
import FormData from 'form-data';

//Add post saga
function* addPost(action) {
    // console.log('in addPost saga with payload of:', action.payload);

    //create payload object
    let data=action.payload;
    //new formdata for payload to multer and router
    let formData = new FormData();
    formData.append('post_img', data.image);
    formData.append('date_of_hunt', data.date);
    formData.append('hunt_area_id', data.huntAreaId);
    formData.append('land_type', data.landType);
    formData.append('title', data.postTitle);
    formData.append('species', data.species);
    formData.append('content', data.story);
    formData.append('success', data.successful);
    formData.append('weaponType', data.weaponType);

    //post to server

    try{
        //send FormData to server for db query
        yield axios.post('/api/posts', formData, {
            //must include this header, it is what Multer uses to id file
            headers:{
                headers: { "Content-Type": "multipart/form-data" },
            }
        });

        //get posts redux and rerender after store is updated

    } catch (err) {
        console.error('in addItem SAGA error:', err);
    }
    // console.log('in addPost saga and formData is:', formData);
}



function* postSaga() {
  yield takeEvery('ADD_POST', addPost);
}

export default postSaga;