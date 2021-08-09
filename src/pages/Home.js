import React, { useEffect, useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  loadGames,
  loadFromLocal,
  loadFilteredGames,
} from "../actions/gamesAction";
// import { initiateLoad, successfulLoad } from "../actions/metaDataAction"; // Currently not being used
//Components
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { useScroll } from "../components/useScroll";
import { useScrollHeader } from "../components/useScrollHeader";
import { lineAnim, opacityOnOff } from "../animations";
import calendar from "../img/calendar.svg";
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
    // dispatch(initiateLoad());
    dispatch(loadFromLocal());
    const same_day_visit = compareSession();
    if (!same_day_visit) {
      localStorage.setItem("session", JSON.stringify(new Date()));
      dispatch(loadGames());
    }
    // dispatch(successfulLoad());
  }, [dispatch]);

  //Get that data back and Check if it is loaded
  const isLoading = useSelector((state) => state.meta.isLoading);
  const {
    popular,
    upcoming,
    highest_rated,
    highest_metacritic,
    recent,
    searched,
  } = useSelector((state) => state.games);

  //States
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
  //Filter Buttons for Popular Section
  const [popularFilter, setPopularFilter] = useState([
    { name: "p1Y", isSelected: "selected" },
    { name: "p2Y", isSelected: "unselected" },
    { name: "p3Y", isSelected: "unselected" },
    { name: "p5Y", isSelected: "unselected" },
  ]);
  //Filter Buttons for Fan Rated Section
  const [fanFilter, setFanFilter] = useState([
    { name: "f1Y", isSelected: "selected" },
    { name: "f2Y", isSelected: "unselected" },
    { name: "f3Y", isSelected: "unselected" },
    { name: "f5Y", isSelected: "unselected" },
  ]);
  //Filter Buttons for Metacritic Section
  const [criticFilter, setCriticFilter] = useState([
    { name: "c1Y", isSelected: "selected" },
    { name: "c2Y", isSelected: "unselected" },
    { name: "c3Y", isSelected: "unselected" },
    { name: "c5Y", isSelected: "unselected" },
  ]);
  //Scroll Animation Set-up for Line
  const [element, controls] = useScroll();
  const [element2, controls2] = useScroll();
  const [element3, controls3] = useScroll();
  const [element4, controls4] = useScroll();
  const [element5, controls5] = useScroll();

  //Scroll Animation Set-up for Header
  const [elementHeader0, controlsHeader0] = useScrollHeader();
  const [elementHeader1, controlsHeader1] = useScrollHeader("upcoming_header");
  const [elementHeader2, controlsHeader2] = useScrollHeader("popular_header");
  const [elementHeader3, controlsHeader3] = useScrollHeader("favorite_header");
  const [elementHeader4, controlsHeader4] = useScrollHeader("critic_header");

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

  //Returns State of Filter Buttons based on Category being Toggled
  const correctFilterButtons = (filter_category) => {
    switch (filter_category) {
      case "p":
        return [popularFilter, setPopularFilter, "popular"];
      case "f":
        return [fanFilter, setFanFilter, "highest_rated"];
      case "c":
        return [criticFilter, setCriticFilter, "highest_metacritic"];
      default:
        return [
          [],
          function () {
            return undefined;
          },
          "",
        ];
    }
  };

  //Updates Filter Button highlight to the one clicked, and dispatches fetch request for Games matching filter
  const updateSelectedHandler = (selected) => {
    let updatedButtons = [];
    const [copyFilter, setCopyFilter, category] = correctFilterButtons(
      selected[0]
    );
    const year_count = selected[1];
    console.log(selected);
    console.log(parseInt(selected[1]));
    copyFilter.map((button) => {
      if (parseInt(selected[1]) >= parseInt(button.name[1])) {
        updatedButtons.push({ name: button.name, isSelected: "selected" });
      } else {
        updatedButtons.push({ name: button.name, isSelected: "unselected" });
      }
      return button;
    });
    setCopyFilter(updatedButtons);
    dispatch(loadFilteredGames(category, year_count));
  };

  return (
    <>
      {!isLoading && (
        <GameList>
          {(pathGameID && <GameDetail pathId={pathGameID} />) ||
            scrollBarHandler()}

          {searched.length ? (
            // truthy vs falsey values, searched is initially empty array (=== true), searched.length when empty is 0 (===false)
            <div className="searched">
              <StickyTop
                variants={opacityOnOff}
                initial="show"
                animate={controlsHeader0}
              >
                <Header>
                  <h2>Searched Games</h2>
                </Header>
                <motion.div
                  variants={lineAnim}
                  initial="hidden"
                  animate="show"
                  className="line"
                ></motion.div>
              </StickyTop>
              <Games ref={elementHeader0}>
                {searched.map((game) =>
                  game.rating !== 0 ? <Game game={game} key={game.id} /> : ""
                )}
              </Games>
            </div>
          ) : (
            ""
          )}
          {/* -------------------------------------------------------------------------------------------------------------------------------------- */}
          <div id="upcoming" className="start_of_category"></div>
          <StickyTop
            id="upcoming_header"
            variants={opacityOnOff}
            initial="show"
            animate={controlsHeader1}
          >
            <Header>
              <h2>Upcoming Games</h2>
            </Header>
            <motion.div
              variants={lineAnim}
              ref={element}
              initial="hidden"
              animate={controls}
              className="line"
            ></motion.div>
          </StickyTop>
          <Games ref={elementHeader1} id="upcoming_container">
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
          {/* -------------------------------------------------------------------------------------------------------------------------------------- */}
          <div id="popular" className="start_of_category"></div>
          <StickyTop
            id="popular_header"
            variants={opacityOnOff}
            initial="show"
            animate={controlsHeader2}
          >
            <Header>
              <h2>Popular Games</h2>
              <div className="filter">
                <button
                  onClick={() => {
                    updateSelectedHandler("p1Y");
                    document.getElementById("popular").scrollIntoView();
                  }}
                  id="p1Y"
                  className={popularFilter[0].isSelected}
                >
                  1Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("p2Y");
                    document.getElementById("popular").scrollIntoView();
                  }}
                  id="p2Y"
                  className={popularFilter[1].isSelected}
                >
                  2Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("p3Y");
                    document.getElementById("popular").scrollIntoView();
                  }}
                  id="p3Y"
                  className={popularFilter[2].isSelected}
                >
                  3Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("p5Y");
                    document.getElementById("popular").scrollIntoView();
                  }}
                  id="p5Y"
                  className={popularFilter[3].isSelected}
                >
                  5Y
                </button>
                <div className="icon">
                  <img src={calendar} alt="calendar" />
                </div>
              </div>
            </Header>
            <motion.div
              variants={lineAnim}
              ref={element2}
              initial="hidden"
              animate={controls2}
              className="line"
            ></motion.div>
          </StickyTop>
          <Games ref={elementHeader2}>
            {popular.slice(0, numberOfPopularGames).map((game) => (
              <Game game={game} key={game.id} />
            ))}
          </Games>
          {/* <GamesDiff></GamesDiff> */}
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
          {/* -------------------------------------------------------------------------------------------------------------------------------------- */}
          <div id="favorite" className="start_of_category"></div>
          <StickyTop
            id="favorite_header"
            variants={opacityOnOff}
            initial="show"
            animate={controlsHeader3}
          >
            <Header>
              <h2>Fan Favorite Games</h2>
              <div className="filter">
                <button
                  onClick={() => {
                    updateSelectedHandler("f1Y");
                    document.getElementById("favorite").scrollIntoView();
                  }}
                  id="f1Y"
                  className={fanFilter[0].isSelected}
                >
                  1Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("f2Y");
                    document.getElementById("favorite").scrollIntoView();
                  }}
                  id="f2Y"
                  className={fanFilter[1].isSelected}
                >
                  2Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("f3Y");
                    document.getElementById("favorite").scrollIntoView();
                  }}
                  id="f3Y"
                  className={fanFilter[2].isSelected}
                >
                  3Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("f5Y");
                    document.getElementById("favorite").scrollIntoView();
                  }}
                  id="f5Y"
                  className={fanFilter[3].isSelected}
                >
                  5Y
                </button>
                <div className="icon">
                  <img src={calendar} alt="calendar" />
                </div>
              </div>
            </Header>
            <motion.div
              variants={lineAnim}
              ref={element3}
              initial="hidden"
              animate={controls3}
              className="line"
            ></motion.div>
          </StickyTop>
          <Games ref={elementHeader3}>
            {highest_rated
              .slice(0, numberOfFavoriteGames)
              .map((game) =>
                game.reviews_count > 15 ? (
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
          {/* -------------------------------------------------------------------------------------------------------------------------------------- */}
          <div id="critic" className="start_of_category"></div>
          <StickyTop
            id="critic_header"
            variants={opacityOnOff}
            initial="show"
            animate={controlsHeader4}
          >
            <Header>
              <h2>Critic Favorite Games</h2>
              <div className="filter">
                <button
                  onClick={() => {
                    updateSelectedHandler("c1Y");
                    document.getElementById("critic").scrollIntoView();
                  }}
                  id="c1Y"
                  className={criticFilter[0].isSelected}
                >
                  1Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("c2Y");
                    document.getElementById("critic").scrollIntoView();
                  }}
                  id="c2Y"
                  className={criticFilter[1].isSelected}
                >
                  2Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("c3Y");
                    document.getElementById("critic").scrollIntoView();
                  }}
                  id="c3Y"
                  className={criticFilter[2].isSelected}
                >
                  3Y
                </button>
                <button
                  onClick={() => {
                    updateSelectedHandler("c5Y");
                    document.getElementById("critic").scrollIntoView();
                  }}
                  id="c5Y"
                  className={criticFilter[3].isSelected}
                >
                  5Y
                </button>
                <div className="icon">
                  <img src={calendar} alt="calendar" />
                </div>
              </div>
            </Header>
            <motion.div
              variants={lineAnim}
              ref={element4}
              initial="hidden"
              animate={controls4}
              className="line"
            ></motion.div>
          </StickyTop>
          <Games ref={elementHeader4}>
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
          {/* -------------------------------------------------------------------------------------------------------------------------------------- */}
          <div id="new" className="start_of_category"></div>
          <StickyTop id="new_header">
            <Header>
              <h2 id="new">Newly Added Games</h2>
            </Header>
            <motion.div
              variants={lineAnim}
              ref={element5}
              initial="hidden"
              animate={controls5}
              className="line"
            ></motion.div>
          </StickyTop>
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
  background: rgba(179, 210, 221, 0.02); //Added this. Might change back later.
  padding: 0rem 5rem;
  @media (max-width: 1536px) {
    padding: 0rem 5rem;
  }
  @media (max-width: 1024px) {
    padding: 0rem 2.5rem;
  }
  @media (max-width: 768px) {
    padding: 0rem 1.5rem;
  }
  @media (max-width: 426px) {
    padding: 0rem 1rem;
  }
  .searched {
    padding: 0rem 0rem 5rem 0rem;
    @media (max-width: 1536px) {
      padding: 0rem 0rem 5rem 0rem;
    }
    @media (max-width: 768px) {
      padding: 0rem 0rem 5rem 0rem;
    }
    @media (max-width: 426px) {
      padding: 0rem 0rem 5rem 0rem;
    }
  }
  .line {
    height: 0.25rem;
    background: #ff7676;
    margin-bottom: 3rem;
    position: -webkit-sticky;
    position: sticky;
    /* top: 5rem; */ //Do not need this anymore because StickyTop
    @media (max-width: 768px) {
      height: 0.15rem;
    }
    @media (max-width: 580px) {
      height: 0.1rem;
      margin-bottom: 1.5rem;
    }
    @media (max-width: 426px) {
      height: 0.1rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const StickyTop = styled(motion.div)`
  position: -webkit-sticky;
  position: sticky;
  top: -1rem;
  @media (max-width: 768px) {
    top: -0.5rem;
  }
  /* @media (max-width: 1536px) {
    top: -4rem;
  }
  @media (max-width: 768px) {
    top: -3rem;
  }
  @media (max-width: 426px) {
    top: -1.5rem;
  } */
`;

const Header = styled(motion.div)`
  /* background: rgba(255, 255, 255, 0.5); */
  background: rgba(255, 255, 255, 0.5);
  /* box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin-top: 1rem;
    padding: 0rem 0rem 1rem 0rem;
    @media (max-width: 1536px) {
      padding: 0rem 0rem 1rem 0rem;
    }
    @media (max-width: 768px) {
      padding: 0rem 0rem 1rem 0rem;
    }
    @media (max-width: 426px) {
      padding: 0rem 0rem 0.5rem 0rem;
    }
  }
  .filter {
    /* background: red; */
    display: flex;
    justify-content: space-evenly;
    padding: 0rem 0rem 1rem 0rem;
    @media (max-width: 1536px) {
      padding: 0rem 0rem 1rem 0rem;
    }
    @media (max-width: 768px) {
      padding: 0rem 0rem 1rem 0rem;
    }
    @media (max-width: 426px) {
      padding: 0rem 0rem 0.5rem 0rem;
    }
    .selected {
      background: #ff7676;
      color: white;
      opacity: 1;
    }
    .icon {
      /* background: pink; */
      display: flex;
      align-items: center;
    }
    img {
      margin-top: 1rem;
      margin-left: 1rem;
      width: fill;
      /* height: 3rem; */
      height: 1.2vw;
      @media (max-width: 1800px) {
        width: fill;
        height: 3rem;
      }
      @media (max-width: 1536px) {
        width: fill;
        height: 2rem;
      }
      @media (max-width: 768px) {
        width: fill;
        height: 1.5rem;
      }
      @media (max-width: 426px) {
        width: fill;
        height: 1rem;
        margin-left: 0.5rem;
      }
    }
    button {
      min-height: 4vh;
      /* font-size: 1.5rem; */
      font-size: 1.2vw;
      margin-top: 1rem;
      border: none;
      padding: 0.5rem 2rem;
      cursor: pointer;
      color: #ff7676;
      background: white;
      opacity: 0.8;
      @media (max-width: 1800px) {
        font-size: 1.5rem;
        padding: 0.5rem 2rem;
      }
      @media (max-width: 1536px) {
        font-size: 1rem;
        padding: 0.5rem 2rem;
      }
      @media (max-width: 1024px) {
        font-size: 1rem;
        padding: 0.5rem 2rem;
      }
      @media (max-width: 768px) {
        font-size: 0.8rem;
        padding: 0.5rem 1rem;
      }
      @media (max-width: 580px) {
        font-size: 0.7rem;
        padding: 0.25rem 0.5rem;
      }
      @media (max-width: 426px) {
        font-size: 0.7rem;
        padding: 0.25rem 0.5rem;
      }
      @media (max-width: 376px) {
        font-size: 0.6875rem;
        padding: 0.25rem 0.5rem;
      }
      &:hover {
        background: #ff7676;
        color: white;
        opacity: 0.8;
      }
    }
  }
`;

const Button = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 0rem;
  @media (max-width: 1536px) {
    padding: 2rem 0rem;
  }
  @media (max-width: 768px) {
    padding: 1rem 0rem 4rem 0rem;
  }
  button {
    min-height: 4vh;
    /* font-size: 1.5rem; */
    font-size: 1.2vw;
    margin-top: 1rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    color: #ff7676;
    /* background: white; */
    background: rgba(179, 210, 221, 0);
    &:hover {
      background: #ff7676;
      color: white;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
    @media (max-width: 1800px) {
      font-size: 1.5rem;
      padding: 0.5rem 2rem;
    }
    @media (max-width: 1536px) {
      font-size: 1.2rem;
      padding: 0.5rem 2rem;
    }
    @media (max-width: 1024px) {
      font-size: 1.2rem;
      padding: 0.5rem 2rem;
    }
    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
    @media (max-width: 580px) {
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
    }
    @media (max-width: 426px) {
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
    }
    @media (max-width: 376px) {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }
  }
`;

const Games = styled(motion.div)`
  min-height: 40vh;
  /* min-height: 80vh; */ //Changed becuz Search Results less than intended where formatted oddly
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
  // ^^^ Changed from 500px
  grid-column-gap: 3rem;
  grid-row-gap: 3rem;
  @media (max-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(425px, 1fr));
    /* grid-column-gap: 2.5rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 1675px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    /* grid-column-gap: 2.5rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 1536px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    /* grid-column-gap: 2.5rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 1440px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    /* grid-column-gap: 2.5rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 1294px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    /* grid-column-gap: 2.5rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 1250px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    /* grid-column-gap: 2.5rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 1140px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    /* grid-column-gap: 2.5rem;
    grid-row-gap: 4rem; */
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    // used to be 400px for only 2 columns, now is 3 columns like Tablet
    /* grid-column-gap: 2rem;
    grid-row-gap: 3rem; */
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 896px) {
    grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 695px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 1.5rem;
    grid-row-gap: 2rem;
  }
  @media (max-width: 580px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
  @media (max-width: 427px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
  @media (max-width: 300px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
`;

export default Home;
