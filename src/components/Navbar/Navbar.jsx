import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My Lists</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="search" className="icons" />
        <p>children</p>
        <img src={bell_icon} alt="icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="icon" className="profile" />
          <img src={caret_icon} alt="icon" />
          <div className="dropdown">
            <p>sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;