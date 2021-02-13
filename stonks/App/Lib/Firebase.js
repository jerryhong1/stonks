import firebase from 'firebase';
import 'firebase/firestore';

// This function should only be called once (right now, at HomeScreen)
// It will throw an error if called multiple times.
function firebaseInit() {
  const firebaseConfig = {
    apiKey: 'AIzaSyB386sF7xB0IXkG7KsWvFrdeYw6zXF4iBA',
    authDomain: 'stonks-cs194.firebaseapp.com',
    projectId: 'stonks-cs194',
    storageBucket: 'stonks-cs194.appspot.com',
    messagingSenderId: '540190111052',
    appId: '1:540190111052:web:dd4c5949229ca68223cbe9'
  };
  firebase.initializeApp(firebaseConfig);
}

export {firebaseInit};
