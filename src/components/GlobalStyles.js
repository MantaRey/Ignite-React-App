import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}
html {
    &::-webkit-scrollbar {
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: darkgray;
    }
}
body {
    font-family: 'Montserrat', sans-serif;
    width: 100%;
}
h1 {
  padding-top: 0.25rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 426px) {
    font-size: 1rem;
  }
}
h2 {
    font-size: 3rem;
    font-family: 'Abril Fatface', cursive;
    font-weight: lighter;
    color: #333;
    @media (max-width: 1536px) {
    font-size: 2.25rem;
    }
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
    @media (max-width: 426px) {
      font-size: 1.25rem;
    }
    @media (max-width: 376px) {
      font-size: 1.15rem;
    }
}
h3 {
    font-size: 1.3rem;
    color: #333;
    padding: 1.5rem 0rem;
    @media (max-width: 1536px) {
      font-size: 1.1rem;
      padding: 1.5rem 0rem;
    }
    @media (max-width: 768px) {
      font-size: .8rem;
      padding: .5rem 0rem;
    }
    @media (max-width: 426px) {
      font-size: .7rem;
      padding: .5rem 0rem;
    }
    @media (max-width: 376px) {
      font-size: .6875rem;
      padding: .5rem 0rem;
    }
}
p {
    font-size: 1.2rem;
    line-height: 200%;
    color: #696969;
    @media (max-width: 1536px) {
      font-size: 1rem;
  }
    @media (max-width: 768px) {
      font-size: .75rem;
  }
    @media (max-width: 426px) {
      font-size: .6rem;
  }
}
a {
    font-size: 1.3rem;
    color: #333;
    padding: 1.5rem 0rem;
    text-decoration: none;
    @media (max-width: 1536px) {
      font-size: 1.1rem;
  }
}
img {
    display: block;
}
input {
    font-family: 'Montserrat', sans-serif;
}
`;

export default GlobalStyles;
