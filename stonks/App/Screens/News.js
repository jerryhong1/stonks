import { NEWS_API_KEY } from "../../config";


export const getArticles = async (topic) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${topic}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
      );
      const json = await response.json();
      console.log("Getting news about ", topic);
      return json;
    } catch (error) {
      console.log(error);
    }
  };