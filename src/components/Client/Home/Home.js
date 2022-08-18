import { responseData } from "../Response/resObject";
import { Header } from "./Header/Header";
import "../../../styles/Home.css";
import { Sidebar } from "./Sidebar/Sidebar";
import { useState, useRef, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const HomePage = () => {
  const [stateData, setData] = useState([]);
  const [error, setError] = useState(null);
  const [counter, setCount] = useState(0);
  const searchInput = useRef();
  const movieItems = useRef();

  useEffect(() => {
    loadPage();
    setCount(1);
    if(counter === 1) {
      fetchallMovies();
    } else {
      console.error("exceeded counter limit");
    }
    return () => {
      // cleanup
    };
  });

  const loadPage = () => {
    const checkLogin = JSON.parse(localStorage.getItem("user"));
    if (checkLogin === null) {
      window.location.pathname = "/login";
    }
  };
  const fetchAPIContent = async () => {
    const inputVal = searchInput.current.value;
    const url = await fetch(
      `http://localhost:4000/api/movies/name/${inputVal}`
    );
    const data = await url.json();
    if (data.error) {
      setError(data.error);
      console.error(data.error);
    } else {
      setData(data);
      console.log(data);
      localStorage.setItem("movie", JSON.stringify(data));
      setError(null);
      window.location.href = "/movies";
    }
  };
  const fetchallMovies = async () => {
    const url = await fetch(`http://localhost:4000/api/movies/`);
    const items = movieItems.current;
    const data = await url.json();
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
              <Carousel autoPlay={true}>
                <div className="corousel_sliderBx">
                  <img src="https://bit.ly/3JOIkTw" alt="" />
                  <p className="legend">SpiderMan No Way Home</p>
                </div>
                <div className="corous_sliderBx">
                  <img src="https://bit.ly/3PoAQHY" alt="" />
                  <p className="legend">Thor Love and Thunder</p>
                </div>
                <div className="corous_sliderBx">
                  <img src="https://bit.ly/3zUyKtS" alt="" />
                  <p className="legend">The Dark Knight</p>
                </div>
              </Carousel>
              {/*  */}
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
