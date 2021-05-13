export const initiateLoad = () => async (dispatch) => {
  dispatch({
    type: "LOADING_GAMES",
  });
};

export const successfulLoad = () => async (dispatch) => {
  dispatch({
    type: "LOADED_GAMES",
  });
};
