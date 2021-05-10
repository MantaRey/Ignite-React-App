const initState = {
  game: {},
  screen: [],
  isLoading: true,
};

const detailsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_DETAILS":
      return {
        ...state,
        game: action.payload.game,
        screen: action.payload.screenshots,
        isLoading: false,
        // screen: action.payload.screen,
      };
    case "LOADING_DETAILS":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};

export default detailsReducer;
