import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA__VJ1DuyrdoNW3hkJu9-1BNbul9lMhkI",
  authDomain: "d3-react-projects.firebaseapp.com",
  databaseURL: "https://d3-react-projects.firebaseio.com",
  projectId: "d3-react-projects",
  storageBucket: "d3-react-projects.appspot.com",
  messagingSenderId: "644627078866",
  appId: "1:644627078866:web:6cfdf5794392fe78"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
