let pageState = { startIndex: 0, endIndex: 3 };
const updatePageState = (state) => {
  pageState = state;
};

// updatePageState({ startIndex: 0, endIndex: 3 }); // default value

const viewPageState = () => console.log("Page State: ", pageState);
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const nextPageState = (event) => {
  updatePageState({
    startIndex: clamp((pageState.startIndex + 4), 0, Number.MAX_VALUE),
    endIndex: clamp((pageState.endIndex + 4), 3, Number.MAX_VALUE)
  });

  viewPageState();
};

const prevPageState = (event) => {
  updatePageState({
    startIndex: clamp((pageState.startIndex - 4), 0, Number.MAX_VALUE),
    endIndex: clamp((pageState.endIndex - 4), 3, Number.MAX_VALUE)
  });

  viewPageState();
};

export default {pageState, updatePageState, nextPageState, prevPageState, viewPageState};