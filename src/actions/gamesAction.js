import axios from "axios";
import {
  popularGamesURL,
  upcomingGamesURL,
  highestRatedGamesURL,
  highestMetacriticGamesURL,
  newGamesURL,
  seachGameURL,
  moreUpcomingGamesURL,
} from "../api";

//Action Creator

export const loadGames = () => async (dispatch) => {
  dispatch({
    type: "LOADING_GAMES",
  });
  //Fetch Axios
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
};

export const loadFromLocal = () => async (dispatch) => {
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
};

export const loadMoreOfCategory = (category) => async (dispatch) => {
  dispatch({
    type: "LOADING_GAMES",
  });
  switch (category) {
    case "upcoming": {
      const moreUpcoming = await axios.get(moreUpcomingGamesURL());
      dispatch({
        type: "LOADING_CATEGORY_GAMES",
        payload: {
          category: moreUpcoming.data.results,
        },
      });
    }
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
