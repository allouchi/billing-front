import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase from './auth';
import {FirebaseContext} from './auth';



ReactDOM.render(
  <FirebaseContext.Provider value = {new Firebase()} > 
        <App />
  </FirebaseContext.Provider>
, document.getElementById('root'));

serviceWorker.unregister();
