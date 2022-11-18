import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
//IMPORT FORM DATA FOR FILE SEND
import FormData from 'form-data';



//ROUTE: /api/editPosts

//fetch the post to edit
function* fetchEditPost(action){
    console.log('in fetchEditPost SAGA with payload of:', action.payload);

    try {
       const editPost = yield axios.get(`/api/editPosts/${action.payload}`);
    //    console.log('response from server in fetchEditPost SAGA', editPost.data);

        yield put({
            type: 'SET_EDIT_POST',
            payload: editPost.data
        })

    } catch (err){
        console.error('in fetch Edit Post SAGA Error', err);
    }

}

function* editPost(action){
    console.log('in editPost saga with a payload of:', action.payload);
    let data=action.payload;

    console.log('the type of picture=', typeof data.picture);

    let formData = new FormData();

        formData.append('id', data.id);
        formData.append('content', data.content);
        formData.append('date_of_hunt', data.date_of_hunt);
        formData.append('hunt_area_id', data.hunt_area_id);
        formData.append('land_type', data.land_type);
        formData.append('species', data.species);
        formData.append('success', data.success);
        formData.append('title', data.title);
        formData.append('weapon_type', data.weapon_type)

    // console.log('object in saga is:', object);


    //append image if it exists
    formData.append('post_img', data.picture)

    yield axios.put('/api/editPosts/image', formData,{
        //must include this header, it is what Multer uses to id file
        headers:{
            headers: { "Content-Type": "multipart/form-data" },
        }
    })

}

function* editPostsSaga() {
    //fetch post to be edited
    yield takeEvery('FETCH_EDIT_POST', fetchEditPost);

    // put new post values to the server 
    yield takeEvery('EDIT_POST', editPost);


}

export default editPostsSaga;