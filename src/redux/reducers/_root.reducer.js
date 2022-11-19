import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import huntAreasReducer from './huntAreas.reducer';
import posts from './posts.reducer';
import comments from './comments.reducer';
import editPost from './editPost.reducer'
import likes from './likes.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  huntAreasReducer, //contains the list of huntareas (array of objects)
  posts, //contains all posts redux state
  comments, //contains all comments redux state
  editPost,  //import the edit posts reducer
  likes, //likes reducer to root reducer
});

export default rootReducer;
