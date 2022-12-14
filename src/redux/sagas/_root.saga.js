import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import postsSaga from './posts.saga';
import huntAreasSaga from './huntAreas.saga';
import commentsSaga from './comments.saga';
import editPostsSaga from './editPost.saga';
import likesSaga from './likes.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    //import postsaga function and listener to connect to saga
    postsSaga(),
    //huntAreasSaga
    huntAreasSaga(),
    commentsSaga(), // import comments saga and add to root
    editPostsSaga(), // import edit posts saga - created because posts was getting too big
    likesSaga(), //likes saga import
  ]);
}
