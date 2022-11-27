import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
//IMPORT FORM DATA FOR FILE SEND
import FormData from 'form-data';



//ROUTE: /api/editPosts

//fetch the post to edit's information for the edit view
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
    // console.log('in editPost saga with a payload of:', action.payload);
    let data=action.payload;

    console.log('the type of picture=', typeof data.picture);


    //if the data.picture is an object (i.e. an image file follow this route and create form data) 
    //else follow the route with no image file (i.e. no change of the post imagew)
    if((typeof data.picture)==='object'){

            // console.log('inside of the image put route call in SAGA')

            //create form data for information
            let formData = new FormData();

            //append values to be updated to send to server for put route using formdata
            formData.append('id', data.id);
            formData.append('content', data.content);
            formData.append('date_of_hunt', data.date_of_hunt);
            formData.append('hunt_area_id', data.hunt_area_id);
            formData.append('land_type', data.land_type);
            formData.append('species', data.species);
            formData.append('success', data.success);
            formData.append('title', data.title);
            formData.append('weapon_type', data.weapon_type);
            formData.append('user_id', data.user_id)

        // console.log('object in saga is:', object);


        //append image to formdata for the ride to the server
        formData.append('post_img', data.picture)
        try{
            //send updated post to server then re-get the info
                            //this route sends an image file to server
            yield axios.put('/api/editPosts/image', formData,{
                //must include this header, it is what Multer uses to id file
                headers:{
                    headers: { "Content-Type": "multipart/form-data" },
                }
            })

            //refresh redux
            yield put({
                type: 'FETCH_POSTS'
            });
            
        } catch (err){
            console.error('in image post edit put route err SAGA:', err);
        }}
        //if the image hasnt been replaced follow this route
    else{
        // console.error('in the no Image conditional')
        try{
            //send updated post to server then re-get the info
                            //no image file in axios put
            yield axios.put('/api/editPosts/noImage', {
                data: data,
            })

            //refresh redux
            yield put({
                type: 'FETCH_POSTS'
            });
            
        } catch (err){
            console.error('in no image post edit put route err SAGA:', err);
        }}


    }




function* editPostsSaga() {
    //fetch post to be edited
    yield takeEvery('FETCH_EDIT_POST', fetchEditPost);

    // put new post values to the server 
    yield takeEvery('EDIT_POST', editPost);


}

export default editPostsSaga;