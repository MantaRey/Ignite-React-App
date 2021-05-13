const initState = {
  popular: [],
  recent: [],
  upcoming: [],
  highest_rated: [],
  highest_metacritic: [],
  searched: [],
  // isLoading: true,
};

const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popular: action.payload.popular,
        recent: action.payload.new,
        upcoming: action.payload.upcoming,
        highest_rated: action.payload.highest_rated,
        highest_metacritic: action.payload.highest_metacritic,
        // isLoading: false,
      };
    // case "LOADING_GAMES":
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    case "LOADING_FROM_LOCAL":
      return {
        ...state,
        popular: action.payload.popular,
        recent: action.payload.new,
        upcoming: action.payload.upcoming,
        highest_rated: action.payload.highest_rated,
        highest_metacritic: action.payload.highest_metacritic,
      };
    case "LOADING_FILTERED_POPULAR":
      return {
        ...state,
        popular: action.payload.filtered,
      };
    case "LOADING_FILTERED_FAVORITE":
      return {
        ...state,
        highest_rated: action.payload.filtered,
      };
    case "LOADING_FILTERED_CRITIC":
      return {
        ...state,
        highest_metacritic: action.payload.filtered,
      };
    case "FETCH_SEARCHED":
      return {
        ...state,
        searched: action.payload.searched,
      };
    case "CLEAR_SEARCHED":
      return {
        ...state,
        searched: [],
      };
    default:
      return { ...state };
  }
};

export default gamesReducer;
