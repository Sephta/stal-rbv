/**
 * Seth Tal
 * 08/09/2021
 * Fetching Data from r/Business using public reddit api
 */


import { pageState } from "./pageState.js";

let prevButton = document.getElementById(`prev-button`);

prevButton.disabled = pageState.endIndex <= 3 ? true : false;

const subreddit = `business`;
const listing   = `new`;
const limit     = `4`;
const timeframe = `month`;

export const dataEndpoint = `https://www.reddit.com/r/${subreddit}/${listing}.json?limit=${limit}&t=${timeframe}`;

export const fetchRedditData = async (endpoint, debug) => {
  await fetch(endpoint)
  .then((response) => response.json())
  .then((responseObject) => {

    debug && console.log("Endpoint: ", endpoint);
    debug && console.log("Data fetched from endpoint: ", responseObject);

    let data = responseObject.data;

    debug && data?.children.forEach((child) => {
      console.log(child);
    });

    let parentContainer = generateListingCards(data.children);

    debug && console.log("Parent Container as HTMLELement: ", parentContainer);
  })
  .catch((error) => {
    error && console.log("ERROR: ", error);
  });
};


const generateListingCards = (data) => {
  // The parent div where all cards will sit
  let parentContainer = document.getElementById("card-container");

  // an accumulator that gets applied to each child's id
  let acc = pageState.startIndex;

  data.forEach((child) => {
    let childContainer = generateChildContainer(child.data, acc); 

    let cardHeader = createCardHeader(child.data.title);
    
    let dashedLine = document.createElement('div');
    dashedLine.id = `dashed-line`;
    
    let cardFooter = createCardFooter(child.data);

    appendElementContent(childContainer, [
      cardHeader,
      dashedLine,
      cardFooter
    ]);

    parentContainer.appendChild(childContainer);
    acc += 1;
  });

  return parentContainer;
};

const generateChildContainer = (data, idSuffix) => {
  let childContainer = document.createElement('a');

  childContainer.id = "child-card-" + idSuffix;
  childContainer.href = `https://www.reddit.com${data.permalink}`;
  childContainer.dataset.json = JSON.stringify(data);
  childContainer.classList.add(`card`);
  childContainer.classList.add(`flex-container`);
  childContainer.classList.add(`flex-column`);

  return childContainer;
};

const createCardHeader = (text) => {
  let header = document.createElement('h2');
  header.innerText = text;

  return header;
};

const createCardFooter = (cardData) => {
  let footerContainer = document.createElement('div');
  footerContainer.classList.add(`card-footer`);
  footerContainer.classList.add(`flex-container`);

  let commentCount = document.createElement('p');
  commentCount.id = `card-comment-count`;
  commentCount.innerText = `${cardData.num_comments} comments`;

  let cardAuthor = document.createElement('p');
  cardAuthor.id = `card-author`;
  cardAuthor.innerText = `submitted by ${cardData.author}`;

  appendElementContent(footerContainer, [
    commentCount,
    cardAuthor
  ]);

  return footerContainer;
};

const appendElementContent = (element, contentList) => {
  contentList.forEach((content) => element.appendChild(content));
};

let response = fetchRedditData(dataEndpoint);

