import React, { useState } from "react";
//Animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { popUp_fadeIn } from "../animations";
//Redux and Routes
import { fetchSearch, clearSearched } from "../actions/gamesAction";
import { useDispatch } from "react-redux";
//Logo
import logo from "../img/logo.svg";
import logo_lit from "../img/logo_lit.svg";

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    // setTextInput("");
  };
  const clearSearchResults = () => {
    setTextInput("");
    dispatch(clearSearched());
  };
  const hover = (e) => {
    document.getElementById("logo").setAttribute("src", logo_lit);
  };
  const unhover = (e) => {
    document.getElementById("logo").setAttribute("src", logo);
  };
  return (
    <StyledNav variants={popUp_fadeIn} initial="hidden" animate="show">
      <Logo
        onMouseOver={hover}
        onMouseLeave={unhover}
        onClick={clearSearchResults}
      >
        <img id="logo" src={logo} alt="website logo" />
        <h1>Ignite</h1>
      </Logo>
      <form onSubmit={submitSearch} className="search">
        <input value={textInput} onChange={inputHandler} type="text" />
        <button>Search</button>
      </form>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    min-height: 4vh;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    outline: none;
    &:focus {
      box-shadow: 0px 0px 10px #ff7676;
    }
  }
  button {
    min-height: 4vh;
    font-size: 1.5rem;
    margin-top: 1rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    width: 2rem;
    height: 2rem;
  }
  &:hover {
    color: #ff7676;
  }
`;

export default Nav;
