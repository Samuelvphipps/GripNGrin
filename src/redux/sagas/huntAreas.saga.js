import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//fetch hunt areas
function* fetchHuntAreas(){
    console.log('in fetchHuntArea SAGA');

    //get huntareas from server
    try{
        //axios get the huntAreas
        const huntAreas = yield axios.get('/api/huntAreas');
        
        // console.log('in huntAreas SAGA with a server return of:', huntAreas.data);
        //send to Redux

    } catch (err){
        //catch error
        console.error('in fetchHuntAreas SAGA error:', err);
    }


}

function* huntAreasSaga() {
  yield takeEvery('FETCH_HUNT_AREAS', fetchHuntAreas);
}

export default huntAreasSaga;