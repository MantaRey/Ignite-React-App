import React from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadDetails } from "../actions/detailsAction";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { smallImage } from "../util";
import { useScroll } from "../components/useScroll";
import { gameCardReveal } from "../animations";
//Routing
import { Link } from "react-router-dom";

const GameC = ({ game, category }) => {
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
          <Link to={`/games/${category}/${id}`}>
            <motion.h3>{name}</motion.h3>
            <p>{released}</p>
            <motion.img
              layoutId={`image ${stringPathId}`}
              src={
                background_image
                  ? smallImage(background_image, 1280)
                  : background_image
              }
              alt={name}
            />
          </Link>
        </StyledGame>
      )}
    </>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

export default GameC;
