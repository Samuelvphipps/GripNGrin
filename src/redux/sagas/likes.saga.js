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

function* likesSaga() {

    //Get a like from client and send to working saga
    yield takeEvery('ADD_LIKE', addLike);

    //get all the likes for a user
    yield takeEvery('FETCH_USER_LIKES', fetchUserLikes);
}

export default likesSaga;
