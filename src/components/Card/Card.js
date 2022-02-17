// LIB
import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./Card.css";

const Card = ({ comic }) => {
  return (
    <Link to={`/comic/${comic._id}`} className="comic-card">
      {comic.thumbnail.path && (
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="comic-card-visual"
        />
      )}
      {comic.title && <h2 className="comic-card-title">{comic.title}</h2>}
    </Link>
  );
};

export default Card;
