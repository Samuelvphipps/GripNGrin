import { combineReducers } from 'redux';


const postsReducer = (state=[], action) =>{
    //set state wen saga calls 'SET_HUNT_AREAS'
    switch(action.type) {
        case 'SET_POSTS':
            return action.payload;
    };

    return state;
};

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