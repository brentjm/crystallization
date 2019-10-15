import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import Main from '../main/main';
import './app.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App-body">
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
  
