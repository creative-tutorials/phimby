import { responseData } from "../Response/resObject";
import { Header } from "./Header/Header";
import "../../../styles/Home.css";
import { Sidebar } from "./Sidebar/Sidebar";
import { useState, useRef, useEffect } from "react";
const HomePage = () => {
  const [stateData, setData] = useState([]);
  const [error, setError] = useState(null);
  const searchInput = useRef();
  const movieItems = useRef();

  useEffect(() => {
    return () => {
      const checkuserLocalStorage = JSON.parse(localStorage.getItem("user"));
      const checkCookie = document.cookie;
      if (checkuserLocalStorage === null && checkCookie === "") {
        // react push to login page
        console.log("no user");
        window.location.href = "/login";
      } else {
        console.log("user found");
        fetchallMovies();
      }
    };
  }, []);

  const fetchAPIContent = async () => {
    const inputVal = searchInput.current.value;
    const url = await fetch(
      `http://localhost:5000/api/movies/name/${inputVal}`
    );
    const data = await url.json();
    if (data.error) {
      setError(data.error);
      console.error(data.error)
    } else {
      setData(data);
      console.log(data);
      localStorage.setItem("movie", JSON.stringify(data));
      setError(null);
      window.location.href = "/movies";
    }
  };
  const fetchallMovies = async () => {
    const url = await fetch(`http://localhost:5000/api/movies/`);
    const items = movieItems.current;
    const data = await url.json();
    if (data.error) {
      setError(data.error);
      console.error(data.error)
    } else {
      setData(data);
      console.log(data);
      setError(null);
      const newData = responseData(data);
      console.log("newData", newData);
      const mappedItems = newData.map((item) => {
        return (items.innerHTML += `<div class="movie__lists">
        <div class="list_poster">
          <img src="${item.thumbnail}" alt="${item.name}" />
        </div>
        <div class="information">
          <h2>${item.name}</h2>
          <div class="lists_menu">
            <p>${item.year}</p>
            <p class="dot">${item.length}</p>
            <p class="dot">${item.Rating}</p>
          </div>
        </div>
      </div>`);
      });
    }
  };
  return (
    <div className="home-page">
      <Sidebar />
      <div className="main-body-01">
        <Header searchInput={searchInput} fetchAPIContent={fetchAPIContent} />
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
            <h2>Popular Movies</h2>
          </div>
          <ul className="list-of-movies">
            <li className="all_list" ref={movieItems}>
              {/* <div className=""></div> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
