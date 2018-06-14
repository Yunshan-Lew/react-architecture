import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunkMiddleware];

// redux devtool configure
const composEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore (initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        composEnhancers(applyMiddleware(...middleware))
    );
    // hot replace configure
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers').default
            store.replaceReducer(nextReducer);
        })
    }

    return store
}