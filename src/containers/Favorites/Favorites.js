// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";

// components
import Card from "../../components/Card/Card";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Spinner from "../../components/Spinner/Spinner";

// Assets
import page404 from "../../assets/images/iron-man-char.jpg";

// CSS
import "./Favorites.css";

const Favorites = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  // Return all favorites for one user from DB
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`/user/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFavoriteCharacters(response.data.favorites.favoriteCharacters);
          setFavoriteComics(response.data.favorites.favoriteComics);

          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, [token]);

  return isLoading ? (
    <Spinner />
  ) : favoriteCharacters.length === 0 && favoriteComics.length === 0 ? (
    <div className="favorite-main">
      <div className="container-empty">
        <div className="favorite-empty-content">
          <h2 className="favorite-main-title">WHERE ARE THE HEROES?</h2>
          <h3 className="favorite-main-subtitle">
            You don't have any favorites yet......
          </h3>
          <p>
            Go to the comics section and the characters pages so that you can
            save your preferences. All your favorites will appear on this page.
          </p>
        </div>

        <img
          className="favorite-empty-visual"
          src={page404}
          alt="erreur 404 : page non trouvé"
        />
      </div>
    </div>
  ) : (
    <main className="favorite-main">
      {favoriteCharacters.length > 0 && (
        <div className="container">
          <h2 className="favorite-main-title">My FAVORITE CHARACTERS</h2>
          <section className="favorite-list">
            {favoriteCharacters.map((character) => {
              return (
                <CharacterCard character={character} key={character._id} />
              );
            })}
          </section>
        </div>
      )}
      {favoriteComics.length > 0 && (
        <div className="container">
          <h2 className="favorite-main-title">My FAVORITE COMICS</h2>
          <section className="favorite-list">
            {favoriteComics.map((comic) => {
              return <Card comic={comic} key={comic._id}></Card>;
            })}
          </section>
        </div>
      )}
    </main>
  );
};

export default Favorites;
