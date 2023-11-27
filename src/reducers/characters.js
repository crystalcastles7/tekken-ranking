const initialState = {
    characters: [],
};

const charactersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CHARACTERS_LIST":
            return {
                ...state,
                characters: action.payload,
            };

        default:
            return state;
    }
};

export default charactersReducer;
