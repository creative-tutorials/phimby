import React from "react";
import "../../../../styles/Home.css";
export function Header({ searchInput, fetchAPIContent }) {
  return (
    <div className="header-col-1">
      <div className="col-req">
        <input
          type="text"
          name="name"
          placeholder="Search"
          ref={searchInput}
          autoComplete="off"
        />
        <button onClick={fetchAPIContent}>
          <i className="fa-regular fa-search"></i>
        </button>
      </div>
      <div className="account_header">
        
      </div>
    </div>
  );
}
