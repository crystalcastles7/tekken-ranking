const initialState = {
    players: [],
};

const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PLAYERS_LIST":
            return {
                ...state,
                players: action.payload.sort((a,b) => a.classValue < b.classValue ? 1 : -1),
            };

        default:
            return state;
    }
};

export default playersReducer;
