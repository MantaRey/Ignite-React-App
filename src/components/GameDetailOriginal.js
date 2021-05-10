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
      history.push("/");
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
            <Stats>
              <div className="rating">
                <motion.h3>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms
                    ?.slice(0, 6)
                    .map((data) => [
                      <img
                        key={data.platform.id}
                        src={getPlatform(data.platform.name)}
                        alt={data.platform.name}
                        title={data.platform.name}
                      />,
                      <p>{data.platform.name}</p>,
                    ])}
                  {/* slice(0,6) used for formatting issues, e.g. Pac Man has 20 platforms and it looked horrible LOL */}
                </Platforms>
              </Info>
            </Stats>
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
            <div className="gallery">
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
            </div>
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
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  z-index: 10;
  color: black;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
  a {
    font-family: "Montserrat", sans-serif;
    &:hover {
      color: #ff7676;
    }
  }
`;

const Info = styled(motion.div)`
  text-align: center;
  overflow: hidden;
  h3 {
    margin-left: 3rem;
  }
  /* align-items: center; */
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
  p {
    padding: 0rem 0.5rem;
  }
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

export default GameDetail;
