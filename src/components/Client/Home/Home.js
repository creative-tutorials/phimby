import { ResponseData } from "../Response/resObject";
import "../../../styles/Home.css";
import { Sidebar } from "./Sidebar/Sidebar";
import { useState, useRef } from "react";
const HomePage = () => {
  const [stateData, setData] = useState([]);
  const [error, setError] = useState(null);
  const searchInput = useRef();
  const movieItem = useRef();

  const fetchAPIContent = async () => {
    const inputVal = searchInput.current.value;
    const movieHTML = movieItem.current;
    const url = await fetch(
      `http://localhost:5000/api/movies/name/${inputVal}`
    );
    const data = await url.json();
    if (data.error) {
      setError(data.error);
    } else {
      setData(data);
      console.log(data);
      const resObjData = ResponseData(data);

      resObjData.map((movie) => {
        return (movieHTML.innerHTML = `
        <div className="movie-item">
          <div className="movie-item-thumbnail">
            <img src="${movie.thumbnail}" alt="${movie.name}" />
          </div>
          <div className="movie-item-info">
            <h3>${movie.name}</h3>
            <p>${movie.length}</p>
            <p>${movie.year}</p>
            <p>${movie.Rating}</p>
          </div>
        </div>`);
      });
      setError(null);
    }
  };
  return (
    <div className="home-page">
      <Sidebar />
      <div className="main-body-01">
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
        </div>
        <div className="movie-content">
          <h2>Premiering Movies</h2>
          <div className="watch-slide">
            <div className="watch-slide-thumb">
              <img src="https://bit.ly/3zQVPNW" alt="" />
              {/*  */}
              <div className="watch-slide-body">
                <div className="watch-slide-body-header">
                  <h3>DC SupertPets</h3>
                </div>
                <div className="watch-slide-info">
                  <p>1h 44m</p>
                  <p>2022</p>
                </div>
                <div className="watch-slide-body-btn">
                  <button>Watch</button>
                  {/* add btn */}
                  <button>
                    <i className="fa-regular fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="movie-list">
          <div className="movie-list-header">
            <h2>Movies</h2>
          </div>
          <ul className="list-of-movies">
            <li className="movies-item" ref={movieItem}>
              {/* <div className=""></div> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
