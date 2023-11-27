import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter';
import './styles/styles.scss';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


const store = configureStore(); // just shows reducer paths

/*
ReactDOM.render(
  <React.StrictMode >
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
*/


const jsx = (
  <Provider store={store}>
      <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("root"))



