// import * as PS from "./pageState.js";
import {nextPageState, prevPageState} from "./pageState.js";

// pageState && console.log("Import test: ", pageState);

let prevButton = document.querySelector(`#prev-button`);
let nextButton = document.querySelector(`#next-button`);

prevButton.addEventListener(`click`, prevPageState);
nextButton.addEventListener(`click`, nextPageState);