// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";

// Components
import Spinner from "../../components/Spinner/Spinner";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

// CSS
import "./Home.css";

const Home = () => {
  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/characters`);

        // update data state with all characters
        setData(response.data);
        setIsLoading(false); // set spinner on false
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="characters-main">
      <div className="container">
        <div className="cards">
          {/* Get all characters */}
          {data.results.map((character) => {
            return <CharacterCard character={character} key={character._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
