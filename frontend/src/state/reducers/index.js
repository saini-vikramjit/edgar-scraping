// REDUX
import { combineReducers } from 'redux';

// REDUCERS
import appStateReducer from './appState';

const reducer = combineReducers({
    appState: appStateReducer,
});

export default reducer;
