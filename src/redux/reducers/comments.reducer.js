import { combineReducers } from 'redux';


const commentsReducer = (state=[], action) =>{

    return state;
};

// const selectedPostReducer = ( state={}, action) =>{
//     //set state with single selected post
//     switch(action.type) {
//         case 'SET_SELECTED_POST':
//             return action.payload;
//     };
// return state;
// }

export default combineReducers({
    commentsReducer,
});

