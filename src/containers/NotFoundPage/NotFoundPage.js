import React from "react";
import { useNavigate } from "react-router-dom";

// Assets
import page404 from "../../assets/images/iron-man-char.jpg";

// CSS
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="NotFoundPage">
      <div className="container">
        <div className="NotFoundPage-content">
          <h2>404 PAGE NOT FOUND</h2>
          <p>
            Check that you typed the address correctly, go back to your previous
            page or try using our site search to find something specific.
          </p>
          <button
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Marvel universe
          </button>
        </div>

        <img
          className="NotFoundPage-visual"
          src={page404}
          alt="erreur 404 : page non trouvé"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
