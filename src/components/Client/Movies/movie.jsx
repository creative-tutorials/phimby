import { Header } from "../../Client/Home/Header/Header";
import "../../../styles/moivecss.css";
import { useState, useRef } from "react";
const Movie = (props) => {
  const [stateData, setData] = useState([]);
  const [error, setError] = useState(null);
  const searchInput = useRef();
  const fetchAPIContent = async () => {
    const inputVal = searchInput.current.value;
    const url = await fetch(
      `http://localhost:4000/api/movies/name/${inputVal}`
    );
    const data = await url.json();
    if (data.error) {
      setError(data.error);
    } else {
      setData(data);
      console.log(data);
      localStorage.setItem("movie", JSON.stringify(data));
      setError(null);
      window.location.reload(); // reload the page
    }
  };
  const LoadPageTitle = () => {
    const movie = JSON.parse(localStorage.getItem("movie"));
    if (movie) {
      document.title = `${movie.name}`;
    } else {
      document.title = "Error loading movie";
    }
  };
  return (
    <div className="movie" onLoad={LoadPageTitle}>
      <Header searchInput={searchInput} fetchAPIContent={fetchAPIContent} />
      <div className="movie__info">
        <h2>{props.Title}</h2>
        <div className="items_list">
          <p>{props.year}</p>
          <p className="dot">{props.length}</p>
          <p className="dot">{props.rating}</p>
        </div>
      </div>
      <div className="movie__poster">
        <img src={props.image} alt={props.Title} />
      </div>
    </div>
  );
};
export default Movie;
