import React from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadDetails } from "../actions/detailsAction";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { useScroll } from "../components/useScroll";
import { gameCardReveal } from "../animations";
import { smallImage } from "../util";
//Routing
import { Link } from "react-router-dom";

const Game = ({ game }) => {
  //possible data to extract at a later data: rating, esrb_rating, genres,
  const { name, released, background_image, short_screenshots, id } = game;

  //Convert id to a string from an integer, used for layoutID (Animation)
  const stringPathId = id.toString();

  //Load Game Details
  const dispatch = useDispatch();
  const loadDetailHandler = () => {
    // document.body.style.overflow = "hidden"; // Ed had put this here, I moved it to GameDetails.js
    dispatch(loadDetails(id, short_screenshots));
  };

  //Check if data is loaded
  const { isLoading } = useSelector((state) => state.games);

  //Scroll Animation Set-up for Individual Games
  const [element, controls] = useScroll();

  return (
    <>
      {!isLoading && (
        <StyledGame
          variants={gameCardReveal}
          whileHover={{}}
          whileTap={{}}
          ref={element}
          animate={controls}
          initial="hidden"
          layoutId={stringPathId}
          onClick={loadDetailHandler}
        >
          <Link to={`/game/${id}`}>
            <motion.h3>{name}</motion.h3>
            <p>{released}</p>
            <motion.img
              src={
                background_image
                  ? smallImage(background_image, 1280)
                  : background_image
              }
              alt={name}
            />
            {/* <div className="genres">
              {genres?.map((genre) => (
                <button key={genre.name}>{genre.name}</button>
              ))}
            </div> */}
          </Link>
        </StyledGame>
      )}
    </>
  );
};

const StyledGame = styled(motion.div)`
  background: white;
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  @media (max-width: 1536px) {
    min-height: 30vh;
  }
  @media (max-width: 426px) {
    min-height: 20vh;
  }
  @media (max-width: 321px) {
    min-height: 10vh;
  }
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
    @media (max-width: 1536px) {
      width: 100%;
      height: 40vh;
    }
    @media (max-width: 1024px) {
      width: 100%;
      height: 35vh;
    }
    @media (max-width: 768px) {
      width: 100%;
      height: 35vh;
    }
    @media (max-width: 580px) {
      width: 100%;
      height: 30vh;
    }
    @media (max-width: 426px) {
      width: 100%;
      height: 25vh;
    }
    @media (max-width: 321px) {
      width: 100%;
      height: 20vh;
    }
  }
  h3 {
    @media (max-width: 768px) {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    @media (max-width: 426px) {
    }
  }

  .genres {
    display: flex;
    justify-content: left;
    overflow: auto;
    button {
      color: #696969;
      background: rgba(173, 216, 230, 0.2);
      border: none;
      border-radius: 50rem;
      padding: 0rem 1rem;
      margin: 0.1rem 0.25rem;
      min-width: max-content;
      &:hover {
        background: rgba(173, 216, 230, 0.75);
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &:hover {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  }
`;

export default Game;
