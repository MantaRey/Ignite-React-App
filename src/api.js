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
const twoYearsAgo = `${currentYear - 2}-${currentMonth}-${currentDay}`;
const threeYearsAgo = `${currentYear - 3}-${currentMonth}-${currentDay}`;
// const fourYearsAgo = `${currentYear - 4}-${currentMonth}-${currentDay}`;
const fiveYearsAgo = `${currentYear - 5}-${currentMonth}-${currentDay}`;
// const eightYearsAgo = `${currentYear - 8}-${currentMonth}-${currentDay}`;

//Upcoming Games
const upcoming_games = `games?${key_url}&dates=${currentDate},${nextYear}&ordering=-added&page_size=40`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;

//Popular Games (One Year Ago - Today)
const popular_games = `games?${key_url}&dates=${lastYear},${currentDate}&ordering=-added&page_size=40`;
export const popularGamesURL = () => `${base_url}${popular_games}`;
//Popular Games (Two Years Ago - Today)
const popular_games_two_years = `games?${key_url}&dates=${twoYearsAgo},${currentDate}&ordering=-added&page_size=40`;
export const popularGamesTwoYearsURL = () =>
  `${base_url}${popular_games_two_years}`;
//Popular Games (Three Years Ago - Today)
const popular_games_three_years = `games?${key_url}&dates=${threeYearsAgo},${currentDate}&ordering=-added&page_size=40`;
export const popularGamesThreeYearsURL = () =>
  `${base_url}${popular_games_three_years}`;
//Popular Games (Five Years Ago - Today)
const popular_games_five_years = `games?${key_url}&dates=${fiveYearsAgo},${currentDate}&ordering=-added&page_size=40`;
export const popularGamesFiveYearsURL = () =>
  `${base_url}${popular_games_five_years}`;

//Highest User Rated Games (One Year Ago - Today)
const highest_rated = `games?${key_url}&dates=${lastYear},${currentDate}&ordering=-rating&page_size=40`;
export const highestRatedGamesURL = () => `${base_url}${highest_rated}`;
//Highest User Rated Games (Two Years Ago - Today)
const highest_rated_two_years = `games?${key_url}&dates=${twoYearsAgo},${currentDate}&ordering=-rating&page_size=40`;
export const highestRatedGamesTwoYearsURL = () =>
  `${base_url}${highest_rated_two_years}`;
//Highest User Rated Games (Three Years Ago - Today)
const highest_rated_three_years = `games?${key_url}&dates=${threeYearsAgo},${currentDate}&ordering=-rating&page_size=40`;
export const highestRatedGamesThreeYearsURL = () =>
  `${base_url}${highest_rated_three_years}`;
//Highest User Rated Games (Five Years Ago - Today)
const highest_rated_five_years = `games?${key_url}&dates=${fiveYearsAgo},${currentDate}&ordering=-rating&page_size=40`;
export const highestRatedGamesFiveYearsURL = () =>
  `${base_url}${highest_rated_five_years}`;

//Highest Metacritic Games (One Year Ago - Today)
const highest_metacritic = `games?${key_url}&dates=${lastYear},${currentDate}&ordering=-metacritic&page_size=40`;
export const highestMetacriticGamesURL = () =>
  `${base_url}${highest_metacritic}`;
//Highest Metacritic Games (Two Years Ago - Today)
const highest_metacritic_two_years = `games?${key_url}&dates=${twoYearsAgo},${currentDate}&ordering=-metacritic&page_size=40`;
export const highestMetacriticGamesTwoYearsURL = () =>
  `${base_url}${highest_metacritic_two_years}`;
//Highest Metacritic Games (Three Years Ago - Today)
const highest_metacritic_three_years = `games?${key_url}&dates=${threeYearsAgo},${currentDate}&ordering=-metacritic&page_size=40`;
export const highestMetacriticGamesThreeYearsURL = () =>
  `${base_url}${highest_metacritic_three_years}`;
//Highest Metacritic Games (Five Years Ago - Today)
const highest_metacritic_five_years = `games?${key_url}&dates=${fiveYearsAgo},${currentDate}&ordering=-metacritic&page_size=40`;
export const highestMetacriticGamesFiveYearsURL = () =>
  `${base_url}${highest_metacritic_five_years}`;

//New Games
const new_games = `games?${key_url}&dates=${lastYear},${currentDate}&ordering=-released&page_size=40`;
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

/*
How should the filtering work?
Popular:
  Results From: 1Year-Today, 2Year-Today, 3Year-Today, 5Year-Today *** I think this one works out well after analyzing results
  Results From: 1Year-Today, 2Year-1Year, 3Year-2Year, 5Year-3Year
Fan Favorites:
  Results From: 1Year-Today, 2Year-Today, 3Year-Today, 5Year-Today *** Top Rated including years further back (results 50/50 similar) between each filter
  Results From: 1Year-Today, 2Year-1Year, 3Year-2Year, 5Year-3Year *** Top Rated of each year (results super different) rating on average is lower
  Results From: 2Year-Today(Recent), 1Year-Today, 2Year-1Year, 3Year-2Year, 5Year-3Year(Oldest) *** Mixture of the 2 above techniques
Critic Favorites:
  Results From: 1Year-Today, 2Year-Today, 3Year-Today, 5Year-Today *** Top Critic Rated including years further back (results 50/50 similar) between each filter
  Results From: 1Year-Today, 2Year-1Year, 3Year-2Year, 5Year-3Year *** Top Critic Rated of each year (results super different) rating on average is lower
  Results From: 2Year-Today(Recent), 1Year-Today, 2Year-1Year, 3Year-2Year, 5Year-3Year(Oldest) *** Mixture of the 2 above techniques
*/
