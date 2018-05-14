import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadGoals } from './actions/goalActions';
import App from './components/App';
import './index.css';

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(reduxThunk)
);

store.dispatch(loadGoals());

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root')
);
