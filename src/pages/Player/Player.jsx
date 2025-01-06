import React, { useEffect, useState } from "react";
import "./Player.css";

import back_arrow_icon from "../../assets/back_arrow_icon.png";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        setVideo(response.data.results[0]);
      } catch (error) {
        console, error(error.message);
      }
    };
    getVideos();
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate(-2);
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${video.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{video.published_at.slice(0, 10)}</p>
        <p>{video.name}</p>
        <p>{video.key}</p>
      </div>
    </div>
  );
}

export default Player;
