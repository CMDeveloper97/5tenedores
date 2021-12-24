import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBSIpg3WHe4cf5E8_--_7WfV9THcMwRPOU",
    authDomain: "tenedores-f63d3.firebaseapp.com",
    databaseURL: "https://tenedores-f63d3.firebaseio.com",
    projectId: "tenedores-f63d3",
    storageBucket: "tenedores-f63d3.appspot.com",
    messagingSenderId: "308257435212",
    appId: "1:308257435212:web:fa9f3aa39a5a8a1e2ccee9"
  };

  // Initialize Firebase
  export const firebaseApp =  firebase.initializeApp(firebaseConfig);