import firebase from 'firebase';
import 'firebase/firestore';

const MS_PER_MIN = 60000;

// Sets up a system to update stocks once per minute. Returns a function for
// unsubscribing.
function stockUpdater() {
  const updateInterval = MS_PER_MIN; // 1 minute
  tryStockUpdate();

  // Create timeout to update at the top of the minute
  let unsubType = 'timeout';
  let unsubHandle = setTimeout(() => {
    unsubHandle = -1;
    unsubType = 'interval';

    // Create interval to call every minute at the top of the minute
    unsubHandle = setInterval(() => {
      tryStockUpdate();
    }, updateInterval);

    tryStockUpdate();
  }, updateInterval - (Date.now() % updateInterval));

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
      const remoteTimestamp = doc.get('update_timestamp');
      const rawTimestamp = Date.now(); // UTC timezone, to convert to another timezone you will need to add/sub the appropriate number of hours
      const localTimestamp = Math.floor(rawTimestamp / MS_PER_MIN); // Convert from ms to minutes

      // Update timestamp if no other user has already updated it
      if (remoteTimestamp < localTimestamp) {
        return Promise.all([
          remoteTimestamp,
          localTimestamp,
          t.update(globalStocksDoc, {
            update_timestamp: localTimestamp
          })
        ]);
      } else {
        // Fail if another user updated the timestamp before us
        throw 'too slow!';
      }
    }).then(([startTimestamp, endTimestamp]) => {
      updateStockData(startTimestamp * MS_PER_MIN, endTimestamp * MS_PER_MIN);
    }).catch((error) => {
      console.log(error);
    });
  } catch (e) {
    console.log(`Transaction failure: ${e}`);
  }
}

// Actually update stock data if you become the delegate. Don't call this
// outside of this library.
function updateStockData(startTimestamp, endTimestamp) {
  // TODO: make polygon API call here and write the data for Firestore
  console.log(`update stocks between ${startTimestamp} and ${endTimestamp}`);
}

export {stockUpdater, tryStockUpdate};
