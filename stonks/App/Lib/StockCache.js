import firebase from 'firebase';
import 'firebase/firestore';

let stockCache = {};
let initialized = false;

function initStockCache(callback) {
  initialized = false;

  const unsub = firebase.firestore().collection('stocks').onSnapshot(snapshot => {
    if (!initialized) {
      initialized = true;

      // Cache data
      for (const doc of snapshot.docs) {
        stockCache[doc.id] = doc.data();
      }

      // Make callback once cache is loaded for the first time
      callback();
    } else {
      for (const change of snapshot.docChanges()) {
        if (change.type === 'removed') {
          delete stockCache[change.doc.id];
        } else {
          stockCache[change.doc.id] = change.doc.data();
        }
      }
    }
  });

  return unsub;
}

export {stockCache, initStockCache};
