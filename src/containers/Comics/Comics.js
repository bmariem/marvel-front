// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";

// Components
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CSS
import "./Comics.css";

const Comics = () => {
  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/comics?page=${page}&search=${search}`
        );

        // update data state with all comics
        setData(response.data);
        setIsLoading(false); // set spinner on false
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, search]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Home">
      <div className="container">
        <div className="search-container">
          <input
            placeholder="Search a comic"
            className="search-input"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
          <FontAwesomeIcon icon="search" className="search-input-icon" />
        </div>
      </div>
      <div className="container">
        <div className="cards">
          {/* Get all comics */}
          {data.results.map((comic) => {
            return <Card comic={comic} key={comic._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Comics;
