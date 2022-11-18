
import { combineReducers } from 'redux';


const editPostReducer = (state={}, action) =>{
    //set state wen saga calls 'SET_HUNT_AREAS'
    switch(action.type) {
        case 'SET_EDIT_POST':
            return action.payload;
    };

    return state;
};



export default combineReducers({
    editPostReducer,
});