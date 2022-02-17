// LIB
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useParams } from "react-router-dom";

// Components
import Spinner from "../../components/Spinner/Spinner";

// CSS
import "./Comic.css";

const Comic = ({ token }) => {
  // the id of the comic sent during navigation
  const { id } = useParams();

  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/comic/${id}`);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  const handleAddFavorite = async () => {
    if (token) {
      try {
        const response = await axios.post(
          `/user/favorites`,
          {
            id: data._id,
            type: "comic",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(response.data.favorites.favoriteComics);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="comic-main-page">
      <div className="container">
        <div className="comic-main-page-content">
          {data.title && (
            <h2 className="comic-main-page-title">{data.title}</h2>
          )}
          {data.description && (
            <p className="comic-main-page-description">{data.description}</p>
          )}

          {token && favorites && (
            <button className="btn" onClick={handleAddFavorite}>
              Make it my favorite
            </button>
          )}
        </div>
        {data.thumbnail.path && (
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt={data.title}
            className="comic-main-page-visual"
          />
        )}
      </div>
    </div>
  );
};

export default Comic;
