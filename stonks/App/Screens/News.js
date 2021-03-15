import { NEWS_API_KEY } from "../../config";
import firebase from 'firebase';



export const getArticles = async (topic, stock) => {
    try {
      const topicDoc = firebase.firestore().collection('articles').doc(stock);
      const snapshot = await topicDoc.get();
      const data = snapshot.data();
      const ONE_HOUR = 60 * 60 * 1000;
      let lastUpdated = data.lastUpdated;
      let articles = [];

      /*
        Hasn't been updated in more than 60 minutes
      */ 
      if (!lastUpdated || lastUpdated < (Date.now() - ONE_HOUR)) {
        console.log("Fetching new data");
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?q=${topic}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
        );
        const json = await response.json();
        const timestamp = Date.now();
        topicDoc.set({
          lastUpdated: timestamp,
          articles: json.articles
        }, {merge: true});
        articles = json.articles;
      }
      else {
        console.log("Getting cached data");
        articles = data.articles;
      }
      return articles;
    } catch (error) {
      console.log(error);
    }
  };