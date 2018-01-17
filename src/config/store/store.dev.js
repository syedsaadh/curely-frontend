import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import DevTools from '../../containers/DevTools';

import reducers from '../../redux/reducers';

const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  compose(applyMiddleware(thunk, historyMiddleware), DevTools.instrument()),
);

export { store, history };
