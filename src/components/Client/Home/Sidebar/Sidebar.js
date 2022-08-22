import "../../../../styles/Home.css";
import React from "react";
import { Link } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="col-sidebar">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Phimby.</h3>
        </div>
        <div className="sidebar-body">
          <ul className="sidebar-list-items">
            <p>Menu</p>
            <li className="sidebar-list-item">
              <Link to="/movies">
                <i className="fa-solid fa-pen-circle"></i> Browse
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/watchlist">
                <i className="fa-light fa-heart"></i> Watchlist
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/soon">
                <i className="fa-solid fa-fire-flame-curved"></i> Coming soon
              </Link>
            </li>
          </ul>
          <ul className="sidebar-list-items">
            <p>Social</p>
            <li className="sidebar-list-item">
              <Link to="/friends">
                <i className="fa-light fa-user"></i> Friends
              </Link>
            </li>
          </ul>
          <ul className="sidebar-list-items">
            <p>General</p>
            <li className="sidebar-list-item">
              <Link to="/settings">
                <i className="fa-regular fa-gear"></i> Settings
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/logout">
                <i className="fa-regular fa-arrow-right-to-bracket"></i> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
