import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import './index.css'
import firebase from 'firebase'

  // web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDoBGEMcIJOKjEtnu2i0aej4eVIqP1k2Sw",
    authDomain: "keepup-6f041.firebaseapp.com",
    projectId: "keepup-6f041",
    storageBucket: "keepup-6f041.appspot.com",
    messagingSenderId: "794645941978",
    appId: "1:794645941978:web:044edf42c16b69fb535fe3",
    measurementId: "G-X9FT4510H4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(<App/>,document.getElementById('root'))