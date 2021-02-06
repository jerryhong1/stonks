import * as firebase from 'firebase';
import 'firebase/firestore';

// Initialize our firebase app if it hasn't already been started.  It may already
// be started if you attempt to reload the app in expo.  The config data is a
// constant generated when first creating the project in Firebase.
if (firebase.apps.length === 0) {
  const firebaseConfig = {
    apiKey: "AIzaSyB386sF7xB0IXkG7KsWvFrdeYw6zXF4iBA",
    authDomain: "stonks-cs194.firebaseapp.com",
    projectId: "stonks-cs194",
    storageBucket: "stonks-cs194.appspot.com",
    messagingSenderId: "540190111052",
    appId: "1:540190111052:web:dd4c5949229ca68223cbe9"
  };
  firebase.initializeApp(firebaseConfig);
}

export default async function firebaseTest() {
  // Get the `test` document from the `users` collection.  Documents contain
  // data and collections contain documents.  In this case, the `users`
  // collection contains documents that store the data for an individual user.
  const testDoc = firebase.firestore().collection('users').doc('test');

  // Get a snapshot of the data in the `test` document from Firebase...
  let testSnapshot = await testDoc.get();
  let testData = testSnapshot.data();

  // ...and modify and print out that data.
  console.log('test has $' + testData.cash, 'in cash');
  for (let stock of testData.stocks) {
    stock.quantity++;
    console.log('test owns', stock.quantity, 'shares of', stock.ticker);
  }

  // Save the modified data back in Firebase.
  await testDoc.set(testData);
}
