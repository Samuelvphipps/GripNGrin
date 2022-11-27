import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//ROUTE: '/api/likes'

//addLike function for axios request
function* addLike(action){
    console.log('in addLike SAGA with a payload of:', action.payload);

    try {
        //post like to db
        yield axios.post('/api/likes', action.payload);

        //fetch all posts again
        yield put({
            type: 'FETCH_POSTS',
        });

        //get the updated userlikes
        yield put({
            type: 'FETCH_USER_LIKES'
        })
        
//if an id is sent along update the selected post store to cause a rerender
//this prevents a state mismatch and rerenders the page
//TODO fix bug on home page
        if(action.payload.selectedPost){
            yield put({
                type: 'FETCH_SELECTED_POST',
                payload: Number(action.payload.selectedPost)
            });
        }

    } catch (err) {
        console.error('in addLike SAGA error', err);
    }
}

//fetchUserLikes from server=>db
function* fetchUserLikes(){
    console.log('in fetchUserLikes');

    try{
        //get likes by the signed in user
        const likes = yield axios.get('/api/likes');
        //set redux likes list
        yield put({
            type: 'SET_USER_LIKES',
            payload: likes.data
        });

    } catch (err) {
        console.error('in fetchUserLikes SAGA error:', err);
    }
}

function* unlike(action) {
    console.log('in unlike SAGA', action.payload);

    try{
        //delete like instante in DB
        yield axios.delete('/api/likes', {
            params: action.payload
        });
        
         //fetch all posts again
         yield put({
            type: 'FETCH_POSTS',
        });

        //get the updated userlikes
        yield put({
            type: 'FETCH_USER_LIKES'
        })
        //if an id is sent along update the selected post store to cause a rerender
        //this prevents a state mismatch and rerenders the page
        //TODO fix bug on home page
        if(action.payload.selectedPost){
            yield put({
                type: 'FETCH_SELECTED_POST',
                payload: Number(action.payload.selectedPost)
            });
        }

    } catch (err){
        console.error('in unlike SAGA error:', err);
    }
}

function* likesSaga() {

    //Get a like from client and send to working saga
    yield takeEvery('ADD_LIKE', addLike);

    //get all the likes for a user
    yield takeEvery('FETCH_USER_LIKES', fetchUserLikes);

    //remove like
    yield takeEvery('UNLIKE', unlike)
}

export default likesSaga;
