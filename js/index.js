/**
 * Seth Tal
 * 08/09/2021
 * Fetching Data from r/Business using public reddit api
 */

const subreddit = `business`;
const listing   = `new`;
const limit     = `4`;
const timeframe = `month`;

const dataEndpoint = `https://www.reddit.com/r/${subreddit}/${listing}.json?limit=${limit}&t=${timeframe}`;

const fetchRedditData = (endpoint) => {
  fetch(endpoint)
  .then((response) => response.json())
  .then((responseObject) => {
    console.log("Data: ", responseObject);

    let data = responseObject.data;

    data?.children.forEach((child) => {
      console.log(child);
    });
  })
  .catch((error) => {
    error && console.log("ERROR: ", error);
  });
};

fetchRedditData(dataEndpoint);
