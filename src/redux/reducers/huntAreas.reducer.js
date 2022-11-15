
const huntAreasReducer = (state=[], action) =>{
    //set state wen saga calls 'SET_HUNT_AREAS'
    switch(action.type) {
        case 'SET_HUNT_AREAS':
            return action.payload;
    };

    return state;
};

export default huntAreasReducer;