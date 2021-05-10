import React, { useEffect } from "react";
//Components and Pages
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Category from "./pages/Category";
import GlobalStyles from "./components/GlobalStyles";
//Routing
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  //adjust scroll behavior when refreshing the page multiple times it would slowly scroll down more and more each time
  window.onload = function () {
    setTimeout(function () {
      window.scrollTo(-10, 0);
    }, 1);
  };
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      {/* <Route path={"/games/:category"} components={Category} /> */}
      <Route
        path={["/game/:id", "/", "games/:category", "games/:category/:id"]}
        component={Home}
      />
      <Redirect to="/" />
    </div>
  );
}

export default App;
