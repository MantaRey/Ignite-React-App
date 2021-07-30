import axios from "axios";
import {
  upcomingGamesURL,
  popularGamesURL,
  popularGamesTwoYearsURL,
  popularGamesThreeYearsURL,
  popularGamesFiveYearsURL,
  highestRatedGamesURL,
  highestRatedGamesTwoYearsURL,
  highestRatedGamesThreeYearsURL,
  highestRatedGamesFiveYearsURL,
  highestMetacriticGamesURL,
  highestMetacriticGamesTwoYearsURL,
  highestMetacriticGamesThreeYearsURL,
  highestMetacriticGamesFiveYearsURL,
  newGamesURL,
  seachGameURL,
} from "../api";

//Action Creator

export const loadGames = () => async (dispatch) => {
  //This is caught by the metaDataReducer, initiate load
  dispatch({
    type: "LOADING_GAMES",
  });
  //Fetch Axios (API Request)
  const popularGames = await axios.get(popularGamesURL());
  const upcomingGames = await axios.get(upcomingGamesURL());
  const favoriteGames = await axios.get(highestRatedGamesURL());
  const criticGames = await axios.get(highestMetacriticGamesURL());
  const newGames = await axios.get(newGamesURL());
  localStorage.setItem("popular", JSON.stringify(popularGames.data.results));
  localStorage.setItem("upcoming", JSON.stringify(upcomingGames.data.results));
  localStorage.setItem(
    "highest_rated",
    JSON.stringify(favoriteGames.data.results)
  );
  localStorage.setItem(
    "highest_metacritic",
    JSON.stringify(criticGames.data.results)
  );
  localStorage.setItem("new", JSON.stringify(newGames.data.results));
  dispatch({
    type: "FETCH_GAMES",
    payload: {
      popular: popularGames.data.results,
      upcoming: upcomingGames.data.results,
      highest_rated: favoriteGames.data.results,
      highest_metacritic: criticGames.data.results,
      new: newGames.data.results,
    },
  });
  //This is caught by the metaDataReducer, successful load
  dispatch({
    type: "LOADED_GAMES",
  });
};

export const loadFromLocal = () => async (dispatch) => {
  //This is caught by the metaDataReducer, initiate load
  dispatch({
    type: "LOADING_GAMES",
  });
  //Fetch Local Storage
  dispatch({
    type: "LOADING_FROM_LOCAL",
    payload: {
      popular: JSON.parse(localStorage.getItem("popular")),
      upcoming: JSON.parse(localStorage.getItem("upcoming")),
      highest_rated: JSON.parse(localStorage.getItem("highest_rated")),
      highest_metacritic: JSON.parse(
        localStorage.getItem("highest_metacritic")
      ),
      new: JSON.parse(localStorage.getItem("new")),
    },
  });
  //This is caught by the metaDataReducer, successful load
  dispatch({
    type: "LOADED_GAMES",
  });
};

export const loadFilteredGames = (category, year_count) => async (dispatch) => {
  //Fetch Axios (API Request) OR Local Storage
  let filteredGames = {};
  if (category === "popular") {
    switch (year_count) {
      case "1":
        filteredGames = JSON.parse(localStorage.getItem("popular"));
        break;

      case "2":
        filteredGames = await axios.get(popularGamesTwoYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      case "3":
        filteredGames = await axios.get(popularGamesThreeYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      case "5":
        filteredGames = await axios.get(popularGamesFiveYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      default:
        filteredGames = JSON.parse(localStorage.getItem("popular"));
    }
    dispatch({
      type: "LOADING_FILTERED_POPULAR",
      payload: {
        filtered: filteredGames,
      },
    });
  } else if (category === "highest_rated") {
    switch (year_count) {
      case "1":
        filteredGames = JSON.parse(localStorage.getItem("highest_rated"));
        break;

      case "2":
        filteredGames = await axios.get(highestRatedGamesTwoYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      case "3":
        filteredGames = await axios.get(highestRatedGamesThreeYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      case "5":
        filteredGames = await axios.get(highestRatedGamesFiveYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      default:
        filteredGames = JSON.parse(localStorage.getItem("highest_rated"));
    }
    dispatch({
      type: "LOADING_FILTERED_FAVORITE",
      payload: {
        filtered: filteredGames,
      },
    });
  } else if (category === "highest_metacritic") {
    switch (year_count) {
      case "1":
        filteredGames = JSON.parse(localStorage.getItem("highest_metacritic"));
        break;

      case "2":
        filteredGames = await axios.get(highestMetacriticGamesTwoYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      case "3":
        filteredGames = await axios.get(highestMetacriticGamesThreeYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      case "5":
        filteredGames = await axios.get(highestMetacriticGamesFiveYearsURL());
        filteredGames = filteredGames.data.results;
        break;

      default:
        filteredGames = JSON.parse(localStorage.getItem("highest_metacritic"));
    }
    dispatch({
      type: "LOADING_FILTERED_CRITIC",
      payload: {
        filtered: filteredGames,
      },
    });
  }
};

export const fetchSearch = (game_name) => async (dispatch) => {
  const searchGames = await axios.get(seachGameURL(game_name));
  dispatch({
    type: "FETCH_SEARCHED",
    payload: {
      searched: searchGames.data.results,
    },
  });
};

export const clearSearched = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_SEARCHED",
  });
};
