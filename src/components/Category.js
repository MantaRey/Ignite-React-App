import React, { useState, useEffect } from "react";
//Redux
import { useSelector } from "react-redux";
//Components
import GameC from "../components/GameC";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { useScroll } from "../components/useScroll";
import { lineAnim } from "../animations";

const Category = ({ category }) => {
  //Data and Check if data is loaded
  const { category_specific, isLoading } = useSelector((state) => state.games);

  //Scroll Animation Set-up for Line
  const [element, controls] = useScroll();

  //State
  const [title, setTitle] = useState("");
  //UseEffect to Set State(title)
  useEffect(() => {
    switch (category) {
      case "upcoming":
        setTitle("Upcoming Games");
        break;
      case "popular":
        setTitle("Popular Games");
        break;
      case "highest_rated":
        setTitle("Fan Favorite Games");
        break;
      case "highest_metacritic":
        setTitle("Critic Favorite Games");
        break;
      case "recent":
        setTitle("Newly Added Games");
        break;
      default:
        setTitle("");
    }
  }, [category]);

  return (
    <>
      {!isLoading && (
        <GameList>
          <h2>{title}</h2>
          <motion.div
            variants={lineAnim}
            ref={element}
            initial="hidden"
            animate={controls}
            className="line"
          ></motion.div>
          <Games>
            {category_specific.map((game) => (
              <GameC category={category} game={game} key={game.id} />
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

export default Category;
