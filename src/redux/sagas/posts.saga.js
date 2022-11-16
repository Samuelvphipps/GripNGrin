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

        yield put({
            type: 'FETCH_POSTS',
            payload: posts.data
        });

        //get posts redux and rerender after store is updated

    } catch (err) {
        console.error('in addItem SAGA error:', err);
    }
    // console.log('in addPost saga and formData is:', formData);
}

function* fetchPosts(){
    console.log('in fetchPosts SAGA');

    try{
        //Get posts from server
        let posts = yield axios.get('/api/posts');

        console.log('response from server in posts get is:', posts.data);
        
        //send posts to redux store\
        yield put({
            type: 'SET_POSTS',
            payload: posts.data
        });

    } catch (err) {
        console.error('in fetchPosts SAGA error:', err);
    }

}

function* fetchSelectedPost(action){
    // console.log('in fetchSinglePost saga');
    try {
        //get the selected post from the Database
        let singlePost = yield axios.get(`/api/posts/${action.payload}`)
        console.log('single post in saga is:', singlePost.data[0]);

        //send selected post information to redux
        yield put({
            type: 'SET_SELECTED_POST',
            payload: singlePost.data[0]
        });


        
    } catch (err){
        console.error('in fetchSinglePost saga error', err);
    }

}

function* postsSaga() {
    //add post
    yield takeEvery('ADD_POST', addPost);

    //Fetch posts
    yield takeEvery('FETCH_POSTS', fetchPosts);

    //fetch single post for the post details page
    yield takeEvery('FETCH_SELECTED_POST', fetchSelectedPost)


}

export default postsSaga;