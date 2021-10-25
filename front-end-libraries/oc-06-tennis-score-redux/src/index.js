import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'

const rootElement = document.getElementById("root"); 
// other solution : no constant and element got at the end of the ReactDOM.render()

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
    <App />
  </StrictMode>
  </Provider>,
  rootElement 
  // other solution : document.getElementById("root")
);