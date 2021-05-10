import React from "react";
//Redux
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { smallImage } from "../util";
//System Images
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//Star Images
import starEmpty from "../img/star_empty.png";
import starFull from "../img/star_full.png";

const GameDetail = ({ pathId }) => {
  //Current URL info
  const history = useHistory();

  //Hide Home-Scrollbar while on GameDetails component
  //  Hot-Fix: Upon leaving Home ("/") to GameDetails component ("/game/:id") --> Scrolling on Home is disabled and Hidden
  const scrollBarHandler = () => {
    document.body.style.overflow = "hidden";
  };

  //Exit Details Component by clicking on Card Shadow, Redirect to Home
  const exitDetailsHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      // history.push("/");
      history.goBack(); // This works exactly as the back button therefore Home is not refreshing, just simply going back. Was originally pushing Home page up a little from where Game Card had been originally clicked (unwanted behaviour)
    }
  };

  //Get Rating Stars
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };

  //Get Platform Images
  const getPlatform = (platform) => {
    if (platform.includes("PlayStation")) {
      return playstation;
    } else if (platform.includes("Xbox")) {
      return xbox;
    } else if (platform === "PC") {
      return steam;
    } else if (platform === "Nintendo Switch") {
      return nintendo;
    } else if (platform.includes("iOS")) {
      return apple;
    } else if (platform.includes("macOS")) {
      return apple;
    } else {
      return gamepad;
    }
  };

  //Data and Check if data is loaded
  const { game, screen, isLoading } = useSelector((state) => state.details);

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailsHandler}>
          {scrollBarHandler()}
          <Detail layoutId={pathId}>
            <Important>
              <Info>
                <Header>
                  <Title>
                    {game.website !== "" ? (
                      <a
                        href={game.website}
                        target="_blank"
                        title={game.website}
                        rel="noreferrer" //I have no idea why it is telling me to do this... Might take it out after launch
                      >
                        <h1 className="active">{game.name}</h1>
                        {game.publishers.slice(0, 2).map((data) => (
                          <p key={data.name}>| {data.name}</p>
                        ))}
                      </a>
                    ) : (
                      <div>
                        <h1 title="No Official Website Given">{game.name}</h1>
                        {game.publishers.slice(0, 2).map((data) => (
                          <p key={data.name}>| {data.name}</p>
                        ))}
                      </div>
                    )}
                  </Title>
                </Header>
                <div className="rating">
                  <div className="metacritic">
                    <p>
                      Metacritic: {game.metacritic ? game.metacritic : "N/A"}
                    </p>
                  </div>
                  <p>Rating: {game.rating}</p>
                  <div className="stars">{getStars()}</div>
                </div>
                <div className="line"></div>
              </Info>
              <Stats>
                {/* <Info> */}
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms?.slice(0, 6).map((data) => (
                    <Platform key={data.platform.id}>
                      <img
                        src={getPlatform(data.platform.name)}
                        alt={data.platform.name}
                        title={data.platform.name}
                      />
                      <p>{data.platform.name}</p>
                    </Platform>
                  ))}
                  {/* slice(0,6) used for formatting issues, e.g. Pac Man has 20 platforms and it looked horrible LOL */}
                </Platforms>
                {/* </Info> */}
              </Stats>
            </Important>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={
                  game.background_image
                    ? smallImage(game.background_image, 1280)
                    : game.background_image
                }
                alt={game.name}
              />
            </Media>
            <Description>
              <p>
                {game.description_raw ? game.description_raw : game.description}
              </p>
            </Description>
            <Gallery>
              {screen?.map((screenshot) =>
                screenshot.id !== -1 ? (
                  <img
                    src={smallImage(screenshot.image, 1280)}
                    key={screenshot.id}
                    alt="In-game screenshot"
                  />
                ) : (
                  ""
                )
              )}
            </Gallery>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem 0rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  z-index: 10;
  color: black;
  @media (max-width: 1750px) {
    padding: 1rem 2.5rem 0rem 2.5rem;
  }
  .rating {
    /* background: cyan; */
  }
  .rating img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
  .line {
    /* background-color: purple; */
    height: 0.1rem;
    margin: 1rem 0rem 0rem 0rem;
    background: #ff7676;
    color: black;
  }
`;

const Header = styled(motion.div)`
  /* background: pink; */
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
  .rating {
    text-align: right;
    padding: 1.5rem 0rem 0rem 0rem;
  }
`;

const Title = styled(motion.h3)`
  /* background: black; */
  width: fit-content;
  @media (max-width: 1024px) {
  }
  * {
    &:hover {
      h1.active {
        color: #ff7676;
      }
    }
  }
`;

const Stats = styled(motion.div)`
  /* background: blue; */
  align-items: center;
  text-align: center; //Added this

  @media (max-width: 1024px) {
    width: 33%;
  }
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
    @media (max-width: 1750px) {
      width: 1.5em;
      height: 1.5em;
    }
  }
  p {
    @media (max-width: 1750px) {
      font-size: 1em;
    }
  }
`;

const Info = styled(motion.div)`
  /* background: red; */
  /* text-align: left;
  overflow: hidden; */
`;

const Important = styled(motion.div)`
  /* background: lime; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1024px) {
    align-items: flex-start;
  }
`;

const Platform = styled(motion.div)`
  /* background: green; */
  /* padding: 0rem 3rem 0rem 0rem;
  margin: 0rem 3rem 0rem 0rem; */
  /* display: flex; */
  padding: 0.5rem 2rem;
  flex-basis: 15rem; // Used to be 15rem and looked awesome for games with 6 platforms, but sucked for 2-3
  @media (max-width: 1750px) {
    flex-basis: 15rem;
  }
  img {
    /* display: block;
    margin-left: auto;
    margin-right: auto; */
    // Uhh i think i need this if i reverse changes
  }
`;

const Platforms = styled(motion.div)`
  /* background: orange; */
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

const Gallery = styled(motion.div)`
  img {
    width: 100%;
  }
`;

export default GameDetail;
