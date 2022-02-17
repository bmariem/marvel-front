import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./config/routes";

// containers
import Home from "./containers/Home/Home";
import Character from "./containers/Character/Character";
import Comics from "./containers/Comics/Comics";
import Comic from "./containers/Comic/Comic";
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
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.CHARACTER} element={<Character />} />
        <Route path={routes.COMICS} element={<Comics />} />
        <Route path={routes.COMIC} element={<Comic />} />
        <Route path={routes.NOTFOUNDPAGE} element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
