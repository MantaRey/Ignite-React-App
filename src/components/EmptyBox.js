import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";
//Scrolling
import disableScroll from "disable-scroll";

const EmptyBox = () => {
  console.log("Empty");
  disableScroll.on(); // prevent scrolling while loading (might not actually be working as intended)
  return <StyledEmptyBox />;
};

const StyledEmptyBox = styled(motion.div)`
  /* background: #a5a5a5; */
  background: rgba(165, 165, 165, 0.2);
  min-height: 45vh;
  border-radius: 0.5rem;
`;

export default EmptyBox;
