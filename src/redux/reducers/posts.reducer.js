import { combineReducers } from 'redux';

//this reducer contains array of all posts which are each an object
const postsReducer = (state=[], action) =>{
    //set state wen saga calls 'SET_HUNT_AREAS'
    
    switch(action.type) {
        case 'SET_POSTS':
            return action.payload;
    };

    return state;
};

//this reducer contains whichever post the user wants to see details of's details so 
//details view can be rendered to the user.
const selectedPostReducer = ( state={}, action) =>{
    //set state with single selected post
    switch(action.type) {
        case 'SET_SELECTED_POST':
            return action.payload;
    };
return state;
}

export default combineReducers({
    postsReducer,
    selectedPostReducer
});