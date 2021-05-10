import React, { useEffect, useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  loadGames,
  loadFromLocal,
  loadMoreOfCategory,
} from "../actions/gamesAction";
//Components
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
import Category from "../components/Category";
//Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useScroll } from "../components/useScroll";
import { lineAnim } from "../animations";
//Routing
import { useLocation, Link } from "react-router-dom";

const Home = () => {
  //Get Current Location
  const location = useLocation();
  const pathGameID = location.pathname.split("/")[2]
    ? location.pathname.split("/")[2]
    : "";
  const pathGameID2 = location.pathname.split("/")[3]
    ? location.pathname.split("/")[3]
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

  //States
  const [category, setCategory] = useState("");

  const compareSession = () => {
    //If user has yet to visit this site today, send API request. Else use Local Storage.
    let date = new Date();
    console.log(date);
    let session = JSON.parse(localStorage.getItem("session"));
    console.log(session);
    if (session === null) {
      console.log("The API is being used. No Session Available");
      return false;
    } else {
      session = new Date(session);
      console.log(session);
      if (
        date.getFullYear() > session.getFullYear() ||
        date.getMonth() > session.getMonth() ||
        date.getDate() > session.getDate()
      ) {
        console.log("The API is being used. Date has Changed");
        return false;
      } else {
        console.log("No API is used, only local storage");
        return true;
      }
    }
  };

  //Fetch More Games of Specific Category
  const getMoreGames = (category) => {
    dispatch(loadMoreOfCategory(category));
  };

  //Scroll Animation Set-up for Line
  const [element, controls] = useScroll();
  const [element2, controls2] = useScroll();
  const [element3, controls3] = useScroll();
  const [element4, controls4] = useScroll();
  const [element5, controls5] = useScroll();

  return (
    <>
      {(!isLoading &&
        pathGameID &&
        isNaN(parseInt(pathGameID)) && [
          <Category category={category}>{scrollBarHandler()}</Category>,
          pathGameID2 && <GameDetail pathId={pathGameID2} />,
        ]) ||
        (!isLoading && (
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
            <h2>Upcoming Games</h2>
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
            <Button>
              <Link
                onMouseOver={() => setCategory("upcoming")}
                to={`/games/${category}`}
              >
                <button onClick={() => getMoreGames("upcoming")}>
                  + Upcoming Games
                </button>
              </Link>
            </Button>
            <h2>Popular Games</h2>
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
            <h2>Fan Favorite Games</h2>
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
            <h2>Critic Favorite Games</h2>
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
            <h2>Newly Added Games</h2>
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
            {/* </AnimateSharedLayout> */}
          </GameList>
        ))}
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
  /* background: yellow; */
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
    /* background: #ff7676;
    color: white; */
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); */
    &:hover {
      background: #ff7676;
      color: white;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

      /* color: #ff7676;
      background: white; */
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
