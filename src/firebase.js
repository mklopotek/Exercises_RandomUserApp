import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCtNc24SxC3ad2D3ybPSTxSdbpaPAtVALo",
    authDomain: "magda-app.firebaseapp.com",
    databaseURL: "https://magda-app.firebaseio.com",
    projectId: "magda-app",
    storageBucket: "magda-app.appspot.com",
    messagingSenderId: "115942300345"
  };
const firebaseApp = firebase.initializeApp(config);

  export default firebase.database()
