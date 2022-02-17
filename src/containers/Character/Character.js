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

const Character = () => {
  // the id of the Character sent during navigation
  const { id } = useParams();

  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
        {console.log(data)}
        <h3 className="character-main-page-title">Comics</h3>
        <div>
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlaySpeed={1000}
            customTransition="all .5"
            showDots={true}
          >
            {data.comics.map((comic) => {
              console.log(comic); // id of each comic
              return <Card comic={comic} key={comic._id}></Card>;
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Character;
