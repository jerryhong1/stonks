import firebase from 'firebase';
import 'firebase/firestore';

// Yeah I know this should probably be a singleton or whatever, but I'm tired
let stockCache = {};
let subscribes = {null: []};
let initialized = false;

function initStockCache(initCallback) {
  initialized = false;

  const unsub = firebase.firestore().collection('stocks').onSnapshot(snapshot => {
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
            subCallback(doc);
          }
          if (subscribeStockCache.hasOwnProperty(doc.id)) {
            for (const subCallback of subscribes[doc.id]) {
              subCallback(doc);
            }
          } else {
            subscribes[doc.id] = [];
          }
        }
      }
    }
  });

  return unsub;
}

// Subscribe to updates for all tickers or a single ticker, if provided.
// Returns an unsubscription callback.
function subscribeStockCache(callback, ticker = null) {
  if (!initialized) {
    return null;
  }

  subscribes[ticker].push(callback);

  // Unsubscription callback
  return function() {
    if (subscribes.hasOwnProperty(ticker)) {
      let callbackIndex = subscribes.indexOf(callback);
      if (callbackIndex !== -1) {
        subscribes[ticker].splice(callbackIndex, 1);
      }
    }
  };
}

export {stockCache, initStockCache, subscribeStockCache};
