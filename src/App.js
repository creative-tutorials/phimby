import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Client/Home/Home";
import MoviePage from "./components/Client/Movies/movie";
import Login from "./components/Client/Auth/Login";
import "./App.css";

function App() {
  const dataStorage = JSON.parse(localStorage.getItem("movie"));
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {dataStorage ? (
            <Route
              path={"/movies/"}
              element={
                <MoviePage
                  id={dataStorage.id}
                  Title={dataStorage.name}
                  year={dataStorage.year}
                  image={dataStorage.thumbnail}
                  length={dataStorage.length}
                  rating={dataStorage.Rating}
                />
              }
            />
          ) : null}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
