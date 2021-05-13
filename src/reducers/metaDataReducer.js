const initState = {
  isLoading: true,
};

const metaDataReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_GAMES":
      return {
        ...state,
        isLoading: true,
      };
    case "LOADED_GAMES":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default metaDataReducer;
