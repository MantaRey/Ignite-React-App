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
  margin-bottom: 2rem;
  text-align: center;
  @media (max-width: 1536px) {
    padding: 2rem 5rem;
  }
  @media (max-width: 768px) {
    padding: 2rem 2.5rem 2rem 2.5rem;
  }
  @media (max-width: 580px) {
    padding: 0.5rem 1rem 2rem 1rem;
  }
  @media (max-width: 426px) {
    padding: 0.5rem 1rem 2rem 1rem;
    margin-bottom: 1rem;
  }
  input {
    width: 30%;
    min-height: 4vh;
    font-size: 1.2vw;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    outline: none;
    @media (max-width: 1800px) {
      width: 30%;
      font-size: 1.5rem;
    }
    @media (max-width: 1536px) {
      width: 40%;
      font-size: 1.2rem;
    }
    @media (max-width: 1024px) {
      width: 50%;
      font-size: 1.2rem;
    }
    @media (max-width: 896px) {
      width: 60%;
      font-size: 1rem;
    }
    @media (max-width: 768px) {
      width: 60%;
      font-size: 1rem;
    }
    @media (max-width: 580px) {
      width: 70%;
      font-size: 0.8rem;
    }
    @media (max-width: 426px) {
      width: 70%;
      font-size: 0.8rem;
    }
    @media (max-width: 376px) {
      width: 70%;
      font-size: 0.8rem;
    }
    @media (max-width: 321px) {
      width: 70%;
      font-size: 0.8rem;
    }
    &:focus {
      box-shadow: 0px 0px 10px #ff7676;
    }
  }
  button {
    min-height: 4vh;
    font-size: 1.2vw;
    margin-top: 1rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    @media (max-width: 1800px) {
      font-size: 1.5rem;
      padding: 0.5rem 2rem;
    }
    @media (max-width: 1536px) {
      font-size: 1.2rem;
      padding: 0.5rem 2rem;
    }
    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
    @media (max-width: 580px) {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
    }
    @media (max-width: 426px) {
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
    }
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
  @media (max-width: 426px) {
    padding: 0.5rem;
  }
  img {
    width: 2.5vw;
    height: 2.5vw;
    @media (max-width: 1800px) {
      width: 2rem;
      height: 2rem;
    }
    @media (max-width: 1536px) {
      width: 2rem;
      height: 2rem;
    }
    @media (max-width: 580px) {
      width: 1.5rem;
      height: 1.5rem;
    }
    @media (max-width: 426px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  &:hover {
    color: #ff7676;
  }
`;

export default Nav;
