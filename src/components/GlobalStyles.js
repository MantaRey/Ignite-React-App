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
  @media (min-width: 1800px) {
    font-size: 2.6vw;
  }
  @media (max-width: 896px) {
    font-size: 1.625rem; //26px
  }
  @media (max-width: 768px) {
    font-size: 1.5rem; //24px
  }
  @media (max-width: 580px) {
    font-size: 1.15rem; //20px
  }
  @media (max-width: 426px) {
    font-size: 1rem; //16px
  }
}
h2 {
    /* font-size: 3rem; //48px */
    font-size: 2.5vw;
    font-family: 'Abril Fatface', cursive;
    font-weight: lighter;
    color: #333;
    @media (max-width: 1800px) {
    font-size: 3rem; //34px
    }
    @media (max-width: 1536px) {
    font-size: 2.125rem; //34px
    }
    @media (max-width: 896px) {
    font-size: 1.875rem; //30px
  }
    @media (max-width: 768px) {
      font-size: 1.75rem; //28px
    }
    @media (max-width: 580px) {
      font-size: 1.25rem; //20px
    }
    @media (max-width: 426px) {
      font-size: 1.25rem; //20px
    }
    @media (max-width: 376px) {
      font-size: 1.125rem; //18px
    }
}
h3 {
    /* font-size: 1.3125rem; //21px */
    font-size: 1vw;
    color: #333;
    padding: 1.5rem 0rem;
    @media (max-width: 1800px) {
      font-size: 1.3125rem; //18px
      padding: 1.5rem 0rem;
    }
    @media (max-width: 1536px) {
      font-size: 1.125rem; //18px
      padding: 1.5rem 0rem;
    }
    @media (max-width: 896px) {
      font-size: 1rem; //16px
      padding: .5rem 0rem;
    }
    @media (max-width: 768px) {
      font-size: .8125rem; //13px
      padding: .5rem 0rem;
    }
    @media (max-width: 580px) {
      font-size: .75rem; //12px
      padding: .5rem 0rem;
    }
    @media (max-width: 426px) {
      font-size: .75rem; //12px
      padding: .25rem 0rem;
    }
    @media (max-width: 376px) {
      font-size: .6875rem; //11px
      padding: .25rem 0rem;
    }
}
p {
    /* font-size: 1.25rem; //20px */
    font-size: 0.85vw;
    line-height: 200%;
    color: #696969;
    @media (max-width: 1800px) {
      font-size: 1.25rem; //20px
  }
    @media (max-width: 1536px) {
      font-size: 1rem; //16px
  }
    @media (max-width: 896px) {
        font-size: .875rem; //14px
  }
    @media (max-width: 768px) {
      font-size: .75rem; //12px
  }
    @media (max-width: 580px) {
      font-size: .6875rem; //11px
  }
    @media (max-width: 426px) {
      font-size: .6875rem; //11px
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
