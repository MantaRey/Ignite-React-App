import React from "react";
//Components and Pages
import Home from "./pages/Home";
import Nav from "./components/Nav";
import GlobalStyles from "./components/GlobalStyles";
//Routing
import { Route, Redirect } from "react-router-dom";

function App() {
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
      <Route
        path={["/game/:id", "/", "games/:category", "games/:category/:id"]}
        component={Home}
      />
      <Redirect to="/" />
    </div>
  );
}

export default App;
