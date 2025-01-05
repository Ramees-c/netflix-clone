import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import axios from "axios";
import { API_KEY, BASE_URL, imageUrl } from "../../Api/Api";

function TitleCards({ title, category }) {
  const [movies, setMovies] = useState([])
  const cardsRef = useRef();

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${category ? category : "now_playing" }?api_key=${API_KEY}&language=en-US&page=1`)
        setMovies(response.data.results)

      } catch (error) {
        console.error(error.message)
      }
    }
    getMovies()
  }, [])

  console.log(movies, "movies")
  

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {movies && movies.map((movie, index) => {
          return (
            <div className="card" key={index}>
              <img src={imageUrl+movie.backdrop_path} alt="" />
              <p>{movie.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>

    
  );
}

export default TitleCards;
