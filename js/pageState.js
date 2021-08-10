import { dataEndpoint, fetchRedditData } from "./index.js";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


export let pageState = { startIndex: 0, endIndex: 3 };
export const updatePageState = (state) => {
  pageState = state;
};

// updatePageState({ startIndex: 0, endIndex: 3 }); // default value

export const viewPageState = () => console.log("Page State: ", pageState);

export const nextPageState = (event) => {

  // console.log(`child-card-${pageState.endIndex}`);
  let cardData = null;

  let acc = pageState.endIndex;
  while (cardData == null)
  {
    // console.log(acc);
    cardData = document.getElementById(`child-card-${acc}`);
    acc -= 1;
  }

  // console.log(cardData);

  cardData = JSON.parse(cardData.dataset.json);

  // console.log("Name: ", cardData.name);

  let cardContainer = document.getElementById(`card-container`);

  // cardContainer.removeChild();

  while (cardContainer.firstChild) cardContainer.removeChild(cardContainer.firstChild);

  fetchRedditData(dataEndpoint + `&after=${cardData.name}`);

  updatePageState({
    startIndex: clamp((pageState.startIndex + 4), 0, Number.MAX_VALUE),
    endIndex: clamp((pageState.endIndex + 4), 3, Number.MAX_VALUE)
  });

  let prevButton = document.getElementById(`prev-button`);

  prevButton.disabled = pageState.endIndex <= 3 ? true : false;

  // viewPageState();
};

export const prevPageState = (event) => {

  // console.log(`child-card-${pageState.endIndex}`);
  let cardData = JSON.parse(document.getElementById(`child-card-${pageState.startIndex}`).dataset.json);

  // console.log("Name: ", cardData.name);

  let cardContainer = document.getElementById(`card-container`);

  // cardContainer.removeChild();

  while (cardContainer.firstChild) cardContainer.removeChild(cardContainer.firstChild);

  fetchRedditData(dataEndpoint + `&before=${cardData.name}`);

  updatePageState({
    startIndex: clamp((pageState.startIndex - 4), 0, Number.MAX_VALUE),
    endIndex: clamp((pageState.endIndex - 4), 3, Number.MAX_VALUE)
  });

  let prevButton = document.getElementById(`prev-button`);

  prevButton.disabled = pageState.endIndex <= 3 ? true : false;

  // viewPageState();
};