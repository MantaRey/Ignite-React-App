import React, { useEffect, useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames, loadFromLocal } from "../actions/gamesAction";
//Components
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
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
          {(pathGameID && <GameDetail pathId={pathGameID} />) ||
            scrollBarHandler()}

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
          <Games>
            {upcoming.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>

          <h2 id="popular">Popular Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element2}
            initial="hidden"
            animate={controls2}
            className="line"
          ></motion.div>
          <Games>
            {popular.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>

          <h2 id="favorite">Fan Favorite Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element3}
            initial="hidden"
            animate={controls3}
            className="line"
          ></motion.div>
          <Games>
            {highest_rated.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>
          <h2 id="critic">Critic Favorite Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element4}
            initial="hidden"
            animate={controls4}
            className="line"
          ></motion.div>
          <Games>
            {highest_metacritic.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>
          <h2 id="new">Newly Added Games</h2>
          <motion.div
            variants={lineAnim}
            ref={element5}
            initial="hidden"
            animate={controls5}
            className="line"
          ></motion.div>
          <Games>
            {recent.map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>
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
