import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

// Components
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

// CSS
import "./Header.css";

// images
import logo from "../../assets/images/logo.png";

const Header = ({
  token,
  setUser,
  setLoginIsOpen,
  setSignupIsOpen,
  modalLoginIsOpen,
  modalSignupIsOpen,
}) => {
  const navigate = useNavigate();

  const handlelogoutClick = () => {
    setUser(null);
    navigate("/"); // Redirection vers home page
  };

  const openSignupModal = () => {
    setSignupIsOpen(true);
  };

  const closeSignupModal = () => {
    setSignupIsOpen(false);
  };

  const openLoginModal = () => {
    setLoginIsOpen(true);
  };

  const closeLoginModal = () => {
    setLoginIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    Modal.setAppElement(".header-container");
  }, []);

  const handleFavoritePageClick = () => {
    if (token) {
      // user authenticated => navigate to favorites page
      navigate("/favorites");
    } else {
      // user not authenticated => set loginModal on true & redirect to targetUrl
      setLoginIsOpen(true);
      navigate("/?target_url=/favorites");
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="marvel" />
        </Link>
      </div>
      <div className="header-navigation">
        <div className="navigation">
          <Link to="/comics">Comics</Link>
          <Link to="/">Characters</Link>
          <span onClick={handleFavoritePageClick}>Favorites</span>
        </div>
      </div>

      <div className="connection">
        {token ? (
          <button
            className="btn-inverse"
            onClick={handlelogoutClick}
            title="Sign out"
          >
            Sign out
          </button>
        ) : (
          <div className="login-signup">
            {/* open modal to signup */}
            <button className="btn-inverse" onClick={openSignupModal}>
              S'inscrire
            </button>

            <Modal
              isOpen={modalSignupIsOpen}
              onRequestClose={closeSignupModal}
              style={customStyles}
              contentLabel="signup Modal"
            >
              <button onClick={closeSignupModal} className="close-modal">
                X
              </button>
              <Signup
                setUser={setUser}
                setSignupIsOpen={setSignupIsOpen}
                setLoginIsOpen={setLoginIsOpen}
              />
            </Modal>

            {/* open modal to signup */}
            <button className="btn-inverse" onClick={openLoginModal}>
              Se connecter
            </button>
            <Modal
              isOpen={modalLoginIsOpen}
              onRequestClose={closeLoginModal}
              style={customStyles}
              contentLabel="Login Modal"
            >
              <button onClick={closeLoginModal} className="close-modal">
                X
              </button>
              <Login
                setUser={setUser}
                setSignupIsOpen={setSignupIsOpen}
                setLoginIsOpen={setLoginIsOpen}
              />
            </Modal>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
