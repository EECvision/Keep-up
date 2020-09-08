import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import './index.css'
import firebase from 'firebase'

  // web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDkSkoxoTRYIBW38ajxXFcvnJtuv6BaEmY",
    authDomain: "todo-461d0.firebaseapp.com",
    databaseURL: "https://todo-461d0.firebaseio.com",
    projectId: "todo-461d0",
    storageBucket: "todo-461d0.appspot.com",
    messagingSenderId: "877108830246",
    appId: "1:877108830246:web:5ec20077c98a4b70cb06e7",
    measurementId: "G-TH5BTQ0JCJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(<App/>,document.getElementById('root'))