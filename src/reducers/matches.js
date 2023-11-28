const initialState = {
    matches: [],
};

const matchesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_MATCHES_LIST":
            return {
                ...state,
                matches: action.payload.sort((a,b)=>a.date < b.date ? 1 : -1),
            };

        default:
            return state;
    }
};

export default matchesReducer;
