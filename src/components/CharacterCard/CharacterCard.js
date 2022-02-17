import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./CharacterCard.css";

const CharacterCard = ({ character }) => {
  return (
    <Link to={`/character/${character._id}`} className="character-card">
      {character.thumbnail.path && (
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="character-card-visual"
        />
      )}
      {character.name && (
        <h2 className="character-card-title">{character.name}</h2>
      )}
    </Link>
  );
};

export default CharacterCard;
