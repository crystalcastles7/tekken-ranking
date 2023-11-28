const initialState = {
    isAdmin: false,
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ADMIN":
            return {
                ...state,
                isAdmin: action.payload,
            };

        default:
            return state;
    }
};

export default accountReducer;
