const initialState = {
    matches: [],
};

const matchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MATCHES_LIST":
            return {
                ...state,
                matches: action.payload,
            };

        default:
            return state;
    }
};

export default matchesReducer;
