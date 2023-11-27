const initialState = {
    players: [],
};

const playersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PLAYERS_LIST":
            return {
                ...state,
                players: action.payload,
            };

        default:
            return state;
    }
};

export default playersReducer;
