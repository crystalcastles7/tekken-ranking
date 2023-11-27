import { createStore, combineReducers } from 'redux';
import playersReducer from '../reducers/players';
import matchesReducer from '../reducers/matches';
import charactersReducer from '../reducers/characters';

export default () => {
    const store = createStore(
        combineReducers({
            players: playersReducer,
            matches: matchesReducer,
            characters: charactersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}
