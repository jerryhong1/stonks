import firebase from 'firebase';
import 'firebase/firestore';

// Read-only cache of stock data from Firestore. Provides a subscription service
// that alerts consumers when data is updated (either for all stocks or a single
// ticker). Yeah I know this should probably be a singleton or whatever, but I'm
// tired.

// The stock cache. Keys are tickers, values are the full data from Firestore
// stock docs.
let stockCache = {};
let subscribes = {null: []};
let initialized = false;

// Initialize the stock cache, only call this once at startup. Returns a
// destructor.
function initStockCache(initCallback) {
  initialized = false;

  const destroy = firebase.firestore().collection('stocks').onSnapshot(snapshot => {
    if (!initialized) {
      initialized = true;

      // Cache data
      for (const doc of snapshot.docs) {
        stockCache[doc.id] = doc.data();
        subscribes[doc.id] = [];
      }

      // Make init callback once cache is loaded for the first time
      initCallback();
    } else {
      for (const change of snapshot.docChanges()) {
        const doc = change.doc;

        if (change.type === 'removed') {
          delete stockCache[doc.id];
          delete subscribes[doc.id]; // Maybe this shouldn't happen silently?
        } else {
          stockCache[doc.id] = doc.data();

          // Make subscription callbacks
          for (const subCallback of subscribes[null]) {
            subCallback(doc.id, doc.data());
          }
          if (subscribes.hasOwnProperty(doc.id)) {
            for (const subCallback of subscribes[doc.id]) {
              subCallback(doc.id, doc.data());
            }
          } else {
            subscribes[doc.id] = [];
          }
        }
      }
    }
  });

  return destroy;
}

// Subscribe to updates for all tickers or a single ticker, if provided.
// Arguments passed to the callback are the ticker of the updated stock and the
// full updated stock data from Firestore. Returns an unsubscription callback.
function subscribeStockCache(callback, ticker = null) {
  if (!initialized) {
    return null;
  }

  subscribes[ticker].push(callback);

  // Unsubscription callback
  return function() {
    if (subscribes.hasOwnProperty(ticker)) {
      let callbackIndex = subscribes[ticker].indexOf(callback);
      if (callbackIndex !== -1) {
        subscribes[ticker].splice(callbackIndex, 1);
      }
    }
  };
}

export {stockCache, initStockCache, subscribeStockCache};
