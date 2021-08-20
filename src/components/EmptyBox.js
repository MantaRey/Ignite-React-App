import React from "react";
//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

const EmptyBox = () => {
  return <StyledEmptyBox />;
};

const StyledEmptyBox = styled(motion.div)`
  background: rgba(165, 165, 165, 0.2);
  min-height: 45vh;
  border-radius: 0.5rem;
`;

export default EmptyBox;
