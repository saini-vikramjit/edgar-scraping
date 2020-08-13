// REDUX
import { createStore, applyMiddleware, compose } from 'redux';

// MIDDLEWARE
import thunk from 'redux-thunk';

// LODASH
import { isUndefined } from 'lodash';

// REDUCER
import reducer from './reducers';

// Redux devtools windows extension
const devToolsExtn = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();

const middleware = applyMiddleware(thunk);

const enhancer = compose(
    middleware,
    !isUndefined(devToolsExtn) ? devToolsExtn : (a) => a,
);

const store = createStore(reducer, enhancer);

export default store;
