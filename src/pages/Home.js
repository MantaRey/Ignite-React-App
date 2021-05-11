import React, { useEffect, useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames, loadFromLocal } from "../actions/gamesAction";
//Components
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
//Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useScroll } from "../components/useScroll";
import { lineAnim } from "../animations";
//Routing
import { useLocation } from "react-router-dom";

const Home = () => {
  //Get Current Location
  const location = useLocation();
  const pathGameID = location.pathname.split("/")[2]
    ? location.pathname.split("/")[2]
    : "";

  //Show Home-Scrollbar while on Home Page
  //  Hot-Fix: Upon returning to Home ("/") whether by Refresh/Back-Arrow/Clicking-Card-Shadow --> Scrolling on Home is Enabled and Shown
  const scrollBarHandler = () => {
    document.body.style.overflow = "auto";
  };

  //Fetch Games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFromLocal());
    const same_day_visit = compareSession();
    if (!same_day_visit) {
      localStorage.setItem("session", JSON.stringify(new Date()));
      dispatch(loadGames());
    }
  }, [dispatch]);

  //Get that data back and Check if it is loaded
  const {
    popular,
    recent,
    upcoming,
    highest_rated,
    highest_metacritic,
    searched,
    isLoading,
  } = useSelector((state) => state.games);

  //States;
  //How many Games to show for each Category
  const [numberOfUpcomingGames, setNumberOfUpcomingGames] = useState(12);
  const [numberOfPopularGames, setNumberOfPopularGames] = useState(12);
  const [numberOfFavoriteGames, setNumberOfFavoriteGames] = useState(12);
  const [numberOfCriticGames, setNumberOfCriticGames] = useState(12);
  const [numberOfNewGames, setNumberOfNewGames] = useState(12);
  //Button Text
  const [upcomingButtonText, setUpcomingButtonText] =
    useState("+ Upcoming Games");
  const [popularButtonText, setPopularButtonText] = useState("+ Popular Games");
  const [favoriteButtonText, setFavoriteButtonText] = useState(
    "+ Fan Favorite Games"
  );
  const [criticButtonText, setCriticButtonText] = useState(
    "+ Critic Favorite Games"
  );
  const [newButtonText, setNewButtonText] = useState("+ Newly Added Games");

  const getLocalGameData = () => {
    if (localStorage.getItem("popular") === null) {
      localStorage.setItem("popular", JSON.stringify([]));
      localStorage.setItem("new", JSON.stringify([]));
      localStorage.setItem("upcoming", JSON.stringify([]));
      localStorage.setItem("highest_rated", JSON.stringify([]));
      localStorage.setItem("highest_metacritic", JSON.stringify([]));
    } else {
      dispatch(loadFromLocal());
    }
  };

  const compareSession = () => {
    //If user has yet to visit this site today, send API request. Else use Local Storage.
    let date = new Date();
    console.log(date);
    let session = JSON.parse(localStorage.getItem("session"));
    console.log(session);
    if (session === null) {
      //The user has never been to the site before
      console.log("The API is being used. No Session Available");
      return false;
    } else {
      //The user has been to the site before
      session = new Date(session);
      console.log(session);
      if (
        date.getFullYear() > session.getFullYear() ||
        date.getMonth() > session.getMonth() ||
        date.getDate() > session.getDate()
      ) {
        //The user has not visited the site today
        console.log("The API is being used. Date has Changed");
        return false;
      } else {
        //The user has visited the site today
        console.log("No API is used, only local storage");
        return true;
      }
    }
  };

  //Scroll Animation Set-up for Line
  const [element, controls] = useScroll();
  const [element2, controls2] = useScroll();
  const [element3, controls3] = useScroll();
  const [element4, controls4] = useScroll();
  const [element5, controls5] = useScroll();

  return (
    <>
      {!isLoading && (
        <GameList>
          {/* <AnimateSharedLayout> */}
          {/* <AnimatePresence> */}
          {(pathGameID && <GameDetail pathId={pathGameID} />) ||
            scrollBarHandler()}
          {/* </AnimatePresence> */}
          {/* Wrap component in AnimatePresence and the component should have some sort of toggle with it */}
          {searched.length ? (
            // truthy vs falsey values, searched is initially empty array (=== true), searched.length when empty is 0 (===false)
            <div className="searched">
              <h2>Searched Games</h2>
              <motion.div
                variants={lineAnim}
                initial="hidden"
                animate="show"
                className="line"
              ></motion.div>
              <Games>
                {searched.map((game) =>
                  game.rating !== 0 ? <Game game={game} key={game.id} /> : ""
                )}
              </Games>
            </div>
          ) : (
            ""
          )}
          <h2 id="upcoming">Upcoming Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element}
            initial="hidden"
            animate={controls}
            className="line"
          ></motion.div>
          <Games id="upcoming_container">
            {upcoming.slice(0, numberOfUpcomingGames).map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>
          <Button>
            <button
              onClick={() => {
                if (upcomingButtonText[0] === "+") {
                  setNumberOfUpcomingGames(48);
                  setUpcomingButtonText("- Upcoming Games");
                } else {
                  setNumberOfUpcomingGames(12);
                  setUpcomingButtonText("+ Upcoming Games");
                  document.getElementById("upcoming").scrollIntoView();
                }
                // getMoreGames("upcoming");
              }}
            >
              {upcomingButtonText}
            </button>
          </Button>
          <h2 id="popular">Popular Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element2}
            initial="hidden"
            animate={controls2}
            className="line"
          ></motion.div>
          <Games>
            {popular.slice(0, numberOfPopularGames).map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>
          <Button>
            <button
              onClick={() => {
                if (popularButtonText[0] === "+") {
                  setNumberOfPopularGames(48);
                  setPopularButtonText("- Popular Games");
                } else {
                  setNumberOfPopularGames(12);
                  setPopularButtonText("+ Popular Games");
                  document.getElementById("popular").scrollIntoView();
                }
              }}
            >
              {popularButtonText}
            </button>
          </Button>
          <h2 id="favorite">Fan Favorite Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element3}
            initial="hidden"
            animate={controls3}
            className="line"
          ></motion.div>
          <Games>
            {highest_rated
              .slice(0, numberOfFavoriteGames)
              .map((game) =>
                game.reviews_count > 10 ? (
                  <Game game={game} key={game.id} />
                ) : (
                  ""
                )
              )}
          </Games>
          <Button>
            <button
              onClick={() => {
                if (favoriteButtonText[0] === "+") {
                  setNumberOfFavoriteGames(48);
                  setFavoriteButtonText("- Fan Favorite Games");
                } else {
                  setNumberOfFavoriteGames(12);
                  setFavoriteButtonText("+ Fan Favorite Games");
                  document.getElementById("favorite").scrollIntoView();
                }
              }}
            >
              {favoriteButtonText}
            </button>
          </Button>
          <h2 id="critic">Critic Favorite Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element4}
            initial="hidden"
            animate={controls4}
            className="line"
          ></motion.div>
          <Games>
            {highest_metacritic.slice(0, numberOfCriticGames).map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>
          <Button>
            <button
              onClick={() => {
                if (criticButtonText[0] === "+") {
                  setNumberOfCriticGames(48);
                  setCriticButtonText("- Critic Favorite Games");
                } else {
                  setNumberOfCriticGames(12);
                  setCriticButtonText("+ Critic Favorite Games");
                  document.getElementById("critic").scrollIntoView();
                }
              }}
            >
              {criticButtonText}
            </button>
          </Button>
          <h2 id="new">Newly Added Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element5}
            initial="hidden"
            animate={controls5}
            className="line"
          ></motion.div>
          <Games>
            {recent.slice(0, numberOfNewGames).map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>
          <Button>
            <button
              onClick={() => {
                if (newButtonText[0] === "+") {
                  setNumberOfNewGames(48);
                  setNewButtonText("- Newly Added Games");
                } else {
                  setNumberOfNewGames(12);
                  setNewButtonText("+ Newly Added Games");
                  document.getElementById("new").scrollIntoView();
                }
              }}
            >
              {newButtonText}
            </button>
          </Button>
          {/* </AnimateSharedLayout> */}
        </GameList>
      )}
    </>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem 1rem 0rem;
  }
  .line {
    height: 0.25rem;
    background: #ff7676;
    margin-bottom: 3rem;
  }
`;

const Button = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0rem;
  button {
    min-height: 4vh;
    font-size: 1.5rem;
    margin-top: 1rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    color: #ff7676;
    background: white;
    &:hover {
      background: #ff7676;
      color: white;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Games = styled(motion.div)`
  min-height: 40vh;
  /* min-height: 80vh; */ //Changed becuz Search Results less than intended where formatted oddly
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 2.5rem;
  }
  @media (max-width: 425px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1.25rem;
  }
`;

export default Home;
