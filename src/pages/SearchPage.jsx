import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [movieName, setMovieName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [movies, setMovies] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;
  const navigate = useNavigate();

  async function SearchMovies() {
    if (movieName.trim() === "") return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      movieName.trim()
    )}&year=${releaseYear.trim()}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    SearchMovies();
  };

  return (
    <div>
      <div className="bg-gray-900 min-h-screen mx-auto py-10">
        <div className="max-w-6xl text-center mx-auto p-5">
          <h1 className="text-5xl text-white mb-5">Search for Movies</h1>
          <p className="font-thin text-gray-300">
            Quickly find any movie by typing its name and release year. Explore
            global hits and local favorites in seconds!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-6xl mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Movie name?</legend>
            <input
              type="text"
              className="input w-full"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              placeholder="Type here"
            />
            <p className="label">Search for your Favourite Movie</p>
          </fieldset>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Released Year?</legend>
            <input
              type="text"
              className="input w-full"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="Type here"
            />
            <p className="label">Optional</p>
          </fieldset>

          <button
            type="submit"
            className="btn border border-red-400 hover:btn-error my-auto"
          >
            Search Movie
          </button>
        </form>

        <div className="max-w-6xl mx-auto p-5 text-white">
          {movies.length > 0 ? (
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {movies.map((movie) => (
                <li key={movie.id} className="bg-gray-800 p-4 rounded-lg  transition-transform duration-1000 hover:text-black hover:bg-white" onClick={() => navigate("/movie/" + movie.id)}>
                    <img
                        src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        alt={movie.title}
                        className="w-full h-72 object-cover mb-4 rounded-lg" />
                  <h2 className="text-xl font-bold">{movie.title}</h2>
                  <p className="text-sm text-gray-300">{movie.release_date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">No results yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
