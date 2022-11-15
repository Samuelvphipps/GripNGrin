


const postsReducer = (state=[], action) =>{
    //set state wen saga calls 'SET_HUNT_AREAS'
    switch(action.type) {
        case 'SET_POSTS':
            return action.payload;
    };

    return state;
};

export default postsReducer;