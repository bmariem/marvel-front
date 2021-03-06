// LIB
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";

// Components
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";

// CSS
import "react-multi-carousel/lib/styles.css";
import "./Character.css";

const Character = ({ token }) => {
  // the id of the Character sent during navigation
  const { id } = useParams();

  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/character/${id}`);
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
            type: "character",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(response.data.favorites.favoriteCharacters);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/user/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFavorites(response.data.favorites.favoriteCharacters);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchData();
    }
  }, [setFavorites, token]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="character-main-page">
      <div className="container">
        <div className="character-main-page-content">
          {data.name && (
            <h2 className="character-main-page-name">{data.name}</h2>
          )}
          {data.description && (
            <p className="character-main-page-description">
              {data.description}
            </p>
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
            alt={data.name}
            className="character-main-page-visual"
          />
        )}
      </div>

      <div className="container">
        {data.comics.length > 0 && (
          <h3 className="character-main-page-title">Comics</h3>
        )}
        <div className="character-main-page-carousel">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            autoPlaySpeed={1000}
            customTransition="all .5"
          >
            {data.comics.map((comic) => {
              return <Card comic={comic} key={comic._id}></Card>;
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Character;
