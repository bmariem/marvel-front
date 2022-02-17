// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import ReactPaginate from "react-paginate";

// Components
import Spinner from "../../components/Spinner/Spinner";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

// CSS
import "./Home.css";

const Home = () => {
  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [pageCount, setPageCount] = useState(1);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/characters?page=${page}`);

        // update data state with all characters
        setData(response.data);
        const limit = response.data.limit;
        setPageCount(Math.ceil(Number(response.data.count) / limit));
        setIsLoading(false); // set spinner on false
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page]);

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
      <div className="container">
        <div className="home-pagination">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
