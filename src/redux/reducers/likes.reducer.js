import { combineReducers } from 'redux';


const userLikesReducer = (state=[], action) =>{
    //set state wen saga calls 'SET_HUNT_AREAS'
    switch(action.type) {
        case 'SET_USER_LIKES':
            return action.payload;
    };

    return state;
};



export default combineReducers({
    userLikesReducer,
});