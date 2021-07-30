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
import starEmpty from "../img/star_empty.svg";
import starQuarter from "../img/star_quarter.svg";
import starHalf from "../img/star_half.svg";
import starThreeQuarter from "../img/star_three_quarter.svg";
import starFull from "../img/star_full.svg";

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
    // const rating = Math.floor(game.rating);
    let rating = game.rating;
    for (let i = 1; i <= 5; i++) {
      rating = rating - 1;
      if (rating >= 0) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else if (rating >= -0.25) {
        stars.push(<img alt="star" key={i} src={starThreeQuarter}></img>);
      } else if (rating >= -0.5) {
        stars.push(<img alt="star" key={i} src={starHalf}></img>);
      } else if (rating >= -0.75) {
        stars.push(<img alt="star" key={i} src={starQuarter}></img>);
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
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms?.map((data) => (
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
              </Stats>
            </Important>
            <Stats_Mobile_View>
              <h3>Platforms</h3>
              <Platforms_Mobile_View>
                {game.platforms?.map((data) => (
                  <Platform_Mobile_View key={data.platform.id}>
                    <img
                      src={getPlatform(data.platform.name)}
                      alt={data.platform.name}
                      title={data.platform.name}
                    />
                    <p>{data.platform.name}</p>
                  </Platform_Mobile_View>
                ))}
              </Platforms_Mobile_View>
              <div className="line"></div>
            </Stats_Mobile_View>
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
    @media (max-width: 768px) {
      width: 0.25rem;
    }
    @media (max-width: 426px) {
      width: 0.15rem;
    }
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Header = styled(motion.div)`
  /* background: pink; */
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

const Title = styled(motion.h3)`
  /* background: black; */
  width: fit-content;
  * {
    &:hover {
      h1.active {
        color: #ff7676;
      }
    }
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
  @media (max-width: 768px) {
    padding: 1rem 1.5rem 0rem 1.5rem;
  }
  @media (max-width: 580px) {
    width: 90%;
    left: 5%;
    padding: 1rem 1rem 0rem 1rem;
  }
  @media (max-width: 426px) {
    width: 90%;
    left: 5%;
    padding: 1rem 1rem 0rem 1rem;
  }
  @media (max-width: 376px) {
    width: 90%;
    left: 5%;
    padding: 1rem 1rem 0rem 1rem;
  }
  @media (max-width: 321px) {
    width: 90%;
    left: 5%;
    padding: 1rem 1rem 0rem 1rem;
  }
  .rating {
    /* background: cyan; */
  }
  .rating img {
    /* width: 2rem;
    height: 2rem; */
    width: 1.2vw;
    height: 1.2vw;
    display: inline;
    @media (max-width: 1800px) {
      width: 2rem;
      height: 2rem;
    }
    @media (max-width: 768px) {
      width: 1.5rem;
      height: 1.5rem;
    }
    @media (max-width: 580px) {
      width: 1.2rem;
      height: 1.2rem;
    }
    @media (max-width: 426px) {
      width: 1.2rem;
      height: 1.2rem;
    }
    @media (max-width: 376px) {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  .line {
    /* background-color: purple; */
    height: 0.1rem;
    margin: 1rem 0rem 0rem 0rem;
    background: #ff7676;
    color: black;
    @media (max-width: 768px) {
      height: 0.075rem;
      margin: 0.75rem 0rem 0rem 0rem;
    }
    @media (max-width: 580px) {
      height: 0.05rem;
      margin: 0.5rem 0rem 0rem 0rem;
    }
    @media (max-width: 426px) {
      height: 0.05rem;
      margin: 0.5rem 0rem 0rem 0rem;
    }
  }
`;

const Info = styled(motion.div)`
  /* background: red; */
`;

const Important = styled(motion.div)`
  /* background: lime; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1338px) {
    align-items: flex-start;
  }
`;

const Stats = styled(motion.div)`
  /* background: blue; */
  align-items: center;
  text-align: center;
  @media (max-width: 1338px) {
    width: 28%;
    justify-content: right;
  }
  @media (max-width: 1024px) {
    width: 28%;
    justify-content: right;
  }
  @media (max-width: 890px) {
    width: 33%;
    justify-content: right;
  }
  // --- Any Screen smaller than 768px (Tablet) will use the alternative Mobile layout --- //
  @media (max-width: 768px) {
    display: none;
  }
  img {
    /* width: 2rem;
    height: 2rem; */
    width: 1vw;
    height: 1vw;
    display: inline;
    @media (max-width: 1800px) {
      width: 2rem;
      height: 2rem;
    }
    @media (max-width: 1750px) {
      width: 1.5rem;
      height: 1.5rem;
    }
    @media (max-width: 768px) {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const Platform = styled(motion.div)`
  /* background: green; */
  padding: 0.5rem 2rem;
  /* flex-basis: 15rem; // Used to be 15rem and looked awesome for games with 6 platforms, but sucked for 2-3 */
  flex-basis: 10vw;
  min-width: max-content;
  @media (max-width: 1800px) {
    flex-basis: 15rem;
  }
  @media (max-width: 1750px) {
    flex-basis: 15rem;
  }
  @media (max-width: 768px) {
    padding: 0.25rem 1rem;
    flex-basis: 10rem;
  }
`;

const Platforms = styled(motion.div)`
  /* background: orange; */
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 45vh;
  max-width: 50vw;
  justify-content: space-evenly;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    width: 0.25rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  @media (max-width: 1536px) {
    margin-top: 3rem;
  }
  @media (max-width: 768px) {
    margin-top: 2.5rem;
  }
  @media (max-width: 426px) {
    margin-top: 1.5rem;
  }
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
  @media (max-width: 1536px) {
    margin: 3rem 0rem;
  }
  @media (max-width: 768px) {
    margin: 2.5rem 0rem;
  }
  @media (max-width: 426px) {
    margin: 1.5rem 0rem;
  }
`;

const Gallery = styled(motion.div)`
  img {
    width: 100%;
  }
`;

const Platforms_Mobile_View = styled(motion.div)`
  /* background: green; */
  overflow: auto;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Platform_Mobile_View = styled(motion.div)`
  /* background: yellow; */
  align-items: center;
  text-align: center;
  padding: 0.25rem 1rem 0.25rem 1rem;
  min-width: max-content;
  img {
    display: block;
    height: 1rem;
    width: 1rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Stats_Mobile_View = styled(motion.div)`
  text-align: center;
  margin-top: 0.5rem; //This is sometimes applies oddly when I first start up the website. Changed from "margin-top: 0.5" to see if bug fixes itself. Didnt work after..
  @media (min-width: 769px) {
    display: none;
  }
  h3 {
    text-align: left;
  }
`;

//Experimenting: changing 1024px breakpoints to 1380px

export default GameDetail;
