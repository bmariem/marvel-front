import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./config/routes";
import Cookies from "js-cookie";

// containers
import Home from "./containers/Home/Home";
import Character from "./containers/Character/Character";
import Comics from "./containers/Comics/Comics";
import Comic from "./containers/Comic/Comic";
import Favorites from "./containers/Favorites/Favorites";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// CSS
import "./App.css";

// ICONS
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  // STATES
  const [token, setToken] = useState(Cookies.get("token") || null); // stay connected if user refresh the page or leave it
  const [modalSignupIsOpen, setSignupIsOpen] = useState(false);
  const [modalLoginIsOpen, setLoginIsOpen] = useState(false);

  const setUser = (token) => {
    // if token exists
    if (token) {
      // => save it in the cookies for 10 days (in the browser session)
      Cookies.set("token", token, { expires: 10 });
    } else {
      // delete token in cookies
      Cookies.remove("token");
    }

    // update the state of token
    setToken(token);
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        setLoginIsOpen={setLoginIsOpen}
        modalLoginIsOpen={modalLoginIsOpen}
        modalSignupIsOpen={modalSignupIsOpen}
        setSignupIsOpen={setSignupIsOpen}
      />
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.CHARACTER} element={<Character token={token} />} />
        <Route path={routes.COMICS} element={<Comics />} />
        <Route path={routes.COMIC} element={<Comic token={token} />} />
        <Route path={routes.FAVORITES} element={<Favorites token={token} />} />
        <Route path={routes.NOTFOUNDPAGE} element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
