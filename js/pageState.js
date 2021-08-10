const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


export let pageState = { startIndex: 0, endIndex: 3 };
export const updatePageState = (state) => {
  pageState = state;
};

// updatePageState({ startIndex: 0, endIndex: 3 }); // default value

export const viewPageState = () => console.log("Page State: ", pageState);

export const nextPageState = (event) => {
  updatePageState({
    startIndex: clamp((pageState.startIndex + 4), 0, Number.MAX_VALUE),
    endIndex: clamp((pageState.endIndex + 4), 3, Number.MAX_VALUE)
  });

  viewPageState();
};

export const prevPageState = (event) => {
  updatePageState({
    startIndex: clamp((pageState.startIndex - 4), 0, Number.MAX_VALUE),
    endIndex: clamp((pageState.endIndex - 4), 3, Number.MAX_VALUE)
  });

  viewPageState();
};