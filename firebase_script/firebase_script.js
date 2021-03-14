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
  // Clear stock data
  const snapshot = await db.collection('stocks').get();
  snapshot.forEach(async (doc) => {
    let data = doc.data();
    delete data.results;
    delete data.lastUpdate;
    db.collection('stocks').doc(doc.id).set(data);
  });
  */

  /*
  // Set company names
  let tickers = ['GME', 'MSFT', 'NFLX', 'TSLA', 'AAPL', 'AMZN', 'GOOGL', 'FB', 'BRK.B', 'JPM', 'V', 'JNJ', 'WMT', 'NVDA', 'DIS', 'MA', 'PYPL', 'PG', 'UNH', 'BAC'];
  let companies = ['Gamestop', 'Microsoft', 'Netflix', 'Tesla', 'Apple', 'Amazon', 'Google', 'Facebook', 'Berkshire Hathaway', 'JPMorgan Chase', 'Visa', 'Johnson & Johnson', 'Walmart', 'NVIDIA', 'Disney', 'Mastercard', 'Paypal', 'Procter & Gamble', 'UnitedHealth Group', 'Bank of America'];
  for (let i in tickers) {
    console.log(`${i}: ${tickers[i]} => ${companies[i]}`);
    await db.collection('stocks').doc(tickers[i]).update({
      ticker: tickers[i],
      company: companies[i]
    });
  }
  */

  //await db.collection('stocks').doc('GME').update({currPrice: 138.2909});
  //await db.collection('stocks').doc('GME').update({currPrice: 69.0});

  const snapshot = await db.collection('stocks').doc('GME').get();
  console.log(snapshot.data().currPrice);
}
yeet();
