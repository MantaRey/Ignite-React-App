//Base URL
const base_url = "https://api.rawg.io/api/";

// API Key
// const key = process.env.REACT_APP_RAWG_API;
const key = "fa0b90f3c73b4c6e8f1b9e1bbd362fc9";
const key_url = `key=${key}`;

//Getting Current Date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

//Current day/month/year
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

//Popular Games
const popular_games = `games?${key_url}&dates=${lastYear},${currentDate}&ordering=-added&page_size=48`;
export const popularGamesURL = () => `${base_url}${popular_games}`;

//Upcoming Games
const upcoming_games = `games?${key_url}&dates=${currentDate},${nextYear}&ordering=-added&page_size=48`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
//More Upcoming Games
const more_upcoming_games = `games?${key_url}&dates=${currentDate},${nextYear}&ordering=-added&page_size=48`;
export const moreUpcomingGamesURL = () => `${base_url}${more_upcoming_games}`;

//Highest User Rated Games
const highest_rated = `games?${key_url}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=48`;
export const highestRatedGamesURL = () => `${base_url}${highest_rated}`;

//Highest Metacritic Games
const highest_metacritic = `games?${key_url}&dates=${lastYear},${currentDate}&ordering=-metacritic&page_size=48`;
export const highestMetacriticGamesURL = () =>
  `${base_url}${highest_metacritic}`;

//New Games
const new_games = `games?${key_url}&dates=${lastYear},${currentDate}&ordering=-released&page_size=48`;
// const new_games = `games?${key_url}&dates=${lastYear},${currentDate}&page_size=12`; //Seems to be new games that were popular
export const newGamesURL = () => `${base_url}${new_games}`;

//Game Details
export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}?${key_url}`;

//Game Screenshots
//Do not need this. This info is already available when Games are requested
export const gameScreenshotsURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?${key_url}`;

//Game Trailer
//There appears to be no available Trailers for any of the games I was looking at, I may have to pay a fee to view YT trailers and gameplay
export const gameTrailerURL = (game_id) =>
  `${base_url}games/${game_id}/movies?${key_url}`;

//Searched Game
export const seachGameURL = (game_name) =>
  `${base_url}games?${key_url}&search=${game_name}&page_size=9`;
