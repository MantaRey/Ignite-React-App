import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

const EmptyBox = () => {
  return <StyledEmptyBox />;
};

const StyledEmptyBox = styled(motion.div)`
  background: rgba(165, 165, 165, 0.2);
  height: 45vh;
  border-radius: 0.5rem;
  @media (max-width: 1024px) {
    height: 40vh;
  }
  @media (max-width: 768px) {
    height: 40vh;
  }
  @media (max-width: 580px) {
    height: 35vh;
  }
  @media (max-width: 426px) {
    height: 30vh;
  }
  @media (max-width: 321px) {
    height: 25vh;
  }
`;

export default EmptyBox;
