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
h2 {
    font-size: 3rem;
    font-family: 'Abril Fatface', cursive;
    font-weight: lighter;
    color: #333;
    /* color: #FF7676; */
}
h3 {
    font-size: 1.3rem;
    color: #333;
    padding: 1.5rem 0rem;
    @media (max-width: 768px) {
        font-size: 1rem;
  }
}
p {
    font-size: 1.2rem;
    line-height: 200%;
    color: #696969;
    @media (max-width: 768px) {
        font-size: .8rem;
  }
}
a {
    font-size: 1.3rem;
    color: #333;
    padding: 1.5rem 0rem;
    text-decoration: none;
}
img {
    display: block;
}
input {
    font-family: 'Montserrat', sans-serif;
}
`;

export default GlobalStyles;
