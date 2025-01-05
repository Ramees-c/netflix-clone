import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import axios from "axios";
import { API_KEY, BASE_URL, imageUrl } from "../../Api/Api";
import { Link } from "react-router-dom";

function TitleCards({ title, category }) {
  const [movies, setMovies] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${
            category ? category : "now_playing"
          }?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(error.message);
      }
    };
    getMovies();
  }, []);


  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {movies &&
          movies.map((movie, index) => {
            return (
              <Link to={`/player/${movie.id}`} className="card" key={index}>
                <img src={imageUrl + movie.backdrop_path} alt="" />
                <p>{movie.original_title}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default TitleCards;
