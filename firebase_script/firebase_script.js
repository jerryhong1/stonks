const admin = require('firebase-admin');
const serviceAccount = require('./stonks-key.json');

async function yeet() {
  // Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();

  // Do stuff with firestore here
  /*
  const snapshot = await db.collection('stocks').get();
  snapshot.forEach(async (doc) => {
    let data = doc.data();
    delete data.results;
    delete data.lastUpdate;
    db.collection('stocks').doc(doc.id).set(data);
  });
  */

  const snapshot = await db.collection('stocks').doc('GME').get();
  const results = snapshot.data().results;
  console.log(results[0]);
  console.log(results[results.length - 1]);

  console.log(new Date(results[0].t));
  console.log(new Date(results[results.length - 1].t));
}
yeet();
