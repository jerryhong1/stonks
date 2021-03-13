import firebase from 'firebase';
import 'firebase/firestore';

const UPDATE_INTERVAL = 15000; // 15 seconds
const POLYGON_KEY = "VfpjQL3hxlS56WBVpmcslVQ5jCwm7U2m"
const POLYGON_URL = "https://api.polygon.io/v2/aggs/" //base url for aggs calls 

// Sets up a system to update stocks once per minute. Returns a function for
// unsubscribing.
function stockUpdater() {
  tryStockUpdate();

  // Create timeout to update at the top of the minute
  let unsubType = 'timeout';
  let unsubHandle = setTimeout(() => {
    unsubHandle = -1;
    unsubType = 'interval';

    // Create interval to call every minute at the top of the minute
    unsubHandle = setInterval(() => {
      tryStockUpdate();
    }, UPDATE_INTERVAL);

    tryStockUpdate();
  }, UPDATE_INTERVAL - (Date.now() % UPDATE_INTERVAL));

  // Return unsubscribe function that cancels the active timeout or interval
  return () => {
    if (unsubType === 'timeout') {
      clearTimeout(unsubHandle);
    } else if (unsubType === 'interval') {
      clearInterval(unsubHandle);
    } else {
      console.error('Invalid unsubscribe type');
    }
  }
}

// Try updating stock data on Firestore a single time.
function tryStockUpdate() {
  const globalStocksDoc = firebase.firestore().collection('global').doc('stocks');

  try {
    // Contend for right to pull data from polygon. Whoever succeeds in
    // committing a successful transaction to Firestore first wins.
    firebase.firestore().runTransaction(async (t) => {
      const doc = await t.get(globalStocksDoc);

      // Timestamps in minutes
      const data = doc.data();
      const rawTimestamp = Date.now(); // UTC timezone, to convert to another timezone you will need to add/sub the appropriate number of hours
      const localTimestamp = Math.floor(rawTimestamp / UPDATE_INTERVAL); // Convert from ms to minutes
      const ticker = data.stockList[data.stockListIndex];

      // Update timestamp and increment stock list index if no other user has
      // already updated it
      if (data.update_timestamp < localTimestamp) {
        return Promise.all([
          ticker,
          localTimestamp,
          t.update(globalStocksDoc, {
            update_timestamp: localTimestamp,
            stockListIndex: (data.stockListIndex + 1) % data.stockList.length
          })
        ]);
      } else {
        // Fail if another user updated the timestamp before us
        throw 'too slow!';
      }
    }).then(([ticker, localTimestamp]) => {
      updateStockData(ticker, localTimestamp * UPDATE_INTERVAL);
    }).catch((error) => {
      console.log(error);
    });
  } catch (e) {
    console.log(`Transaction failure: ${e}`);
  }
}

function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;
  return [year, month, day].join('-');
}

// Actually update stock data if you become the delegate. Don't call this
// outside of this library.
async function updateStockData(ticker, endTimestamp) {
  const stockDocRef = firebase.firestore().collection('stocks').doc(ticker);

  // Convert timestamps to UTC strings, subtracting one day due to polygon only updating at EOD
  let endDate = new Date(endTimestamp);
  endDate.setUTCDate(endDate.getUTCDate() - 1);
  endTimestamp = endDate.getTime();

  const snapshot = await stockDocRef.get();
  let startTimestamp = snapshot.get('lastUpdate');
  if (startTimestamp === undefined) {
    // Reset to the start of the trading day one month ago
    startTimestamp = new Date();
    //startTimestamp.setUTCMonth(startTimestamp.getUTCMonth() - 1);
    startTimestamp.setUTCDate(startTimestamp.getUTCDate() - 2); // TODO: switch back
    startTimestamp.setUTCHours(0);
  }
  const startDate = new Date(startTimestamp);
  console.log(`retrieve polygon data for ${ticker} from ${startDate} to ${endDate}`);

  // Get stock data from Polygon
  //https://api.polygon.io/v2/aggs/ticker/AAPL/range/5/minute/2020-10-14/2020-10-14?unadjusted=true&sort=asc&limit=5000&apiKey=VfpjQL3hxlS56WBVpmcslVQ5jCwm7U2m
  const fullCall = POLYGON_URL + "ticker/" + ticker + "/range/5/minute/" + formatDate(startDate) + "/" + formatDate(endDate) + "?unadjusted=true&sort=asc&limit=5000&apiKey=" + POLYGON_KEY;
  console.log(fullCall);
  console.log('pulling stocks from polygon');
  const response = await fetch(fullCall);
  const data = await response.json();
  if (data.status === 'ERROR') {
    console.warn(`polygon.io API call error: ${data.error}`);
    return;
  }

  // Get the indices of the entries we're looking for
  // Don't tell me it's slow, I swear it's ok
  const startIndex = data.results.findIndex(entry => entry.t > startTimestamp); // inclusive
  let endIndex = data.results.findIndex(entry => entry.t > endTimestamp); // exclusive
  if (endIndex === -1 && startIndex !== -1) {
    endIndex = data.results.length;
  } else if (endIndex <= startIndex) {
    console.log("no update");
    return;
  }
  console.log(`betw ${startIndex} and ${endIndex}`);

  // Append new data to Firestore
  const newData = data.results.slice(startIndex, endIndex);
  try {
    firebase.firestore().runTransaction(async (t) => {
      const doc = await t.get(stockDocRef);

      // Concatenate new stock data to stock history
      let hist = doc.get('history');
      if (hist === undefined) {
        hist = [];
      }
      hist = hist.concat(newData);

      // Commit to Firestore
      return t.update(stockDocRef, {
        history: hist,
        lastUpdate: data.results[endIndex-1].t
      });
    }).then(() => {
      console.log("success uploading to firestore");
    });
  } catch (e) {
    console.log(`Stock transaction failure: ${e}`);
  }
}

export {stockUpdater, tryStockUpdate};
