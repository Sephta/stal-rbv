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

const fetchRedditData = async (endpoint) => {
  await fetch(endpoint)
  .then((response) => response.json())
  .then((responseObject) => {
    // console.log("Data: ", responseObject);

    let data = responseObject.data;

    // data?.children.forEach((child) => {
    //   console.log(child);
    // });

    let parentContainer = generateListingCards(data.children);

    console.log("Parent: ", parentContainer);

    return new Promise((props) => console.log("Promise: ", data),
      (err) => console.log("ERR: ", err));
  })
  .catch((error) => {
    error && console.log("ERROR: ", error);
  });
};


const generateListingCards = (data) => {
  // The parent div where all cards will sit
  let parentContainer = document.getElementById("card-container");

  // an accumulator that gets applied to each child's id
  let acc = 0;

  data.forEach((child) => {
    let childContainer = document.createElement('a');
    childContainer.id = "child-card-" + acc;
    childContainer.href = `${child.data.url}`;
    childContainer.classList.add(`card`);
    childContainer.classList.add(`flex-container`);
    childContainer.classList.add(`flex-column`);

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

let testValue = fetchRedditData(dataEndpoint)
  .then((message) => console.log("Test: ", testValue, " , Message: ", message));

