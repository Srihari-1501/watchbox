import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import TrendingMovies from "../components/TrendingMovies";
import axios from "axios";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  async function handleWatchList(id) {
    const watchList = JSON.parse(localStorage.getItem("user")) || [];

    try {
      const res = await axios.post("http://localhost:5000/api/watchlist", {
        userId: watchList.id,
        movieId: id,
      });
      alert("Movie added to watchlist successfully!");
      console.log("Movie added to watchlist:", res.data.watchlistEntry);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      alert("Failed to add movie to watchlist. Please try again.");
      
    }
    
  }
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id,apiKey]);

  if (!movie) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-medium text-gray-200 animate-pulse">
            Loading movie details...
          </p>  
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="max-w-7xl mx-auto p-4">
        {/* Banner */}
        <div
          className="relative h-72 md:h-[30rem] rounded-xl overflow-hidden shadow-md"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <h1 className="text-white text-3xl md:text-5xl font-bold p-6">
              {movie.title}
            </h1>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 h-auto rounded-2xl shadow-lg hover:scale-105 transition duration-300"
          />

          {/* Overview & Badges */}
          <div className="flex-1 space-y-4">
            {movie.tagline && (
              <p className="text-xl italic text-gray-300">“{movie.tagline}”</p>
            )}
            <h1 className="mb-2 font-bold text-xl">Overview:</h1>
            <p className="text-sm leading-relaxed text-gray-300">
              {movie.overview}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map((genre) => (
                <Badge
                  key={genre.id}
                  label={genre.name}
                  color="bg-purple-600"
                />
              ))}
              <Badge
                label={`Lang: ${movie.original_language.toUpperCase()}`}
                color="bg-indigo-600"
              />
              <Badge
                label={`Runtime: ${movie.runtime} min`}
                color="bg-blue-600"
              />
              <Badge
                label={`Released: ${movie.release_date}`}
                color="bg-green-600"
              />
              <Badge label={`Status: ${movie.status}`} color="bg-yellow-600" />
              <Badge
                label={`⭐ ${movie.vote_average} (${movie.vote_count} votes)`}
                color="bg-pink-600"
              />
            </div>

            {/* Links */}
            <div className="mt-4 space-y-2 text-sm">
              {movie.imdb_id && (
                <p>
                  <span className="font-semibold">IMDb:</span>{" "}
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {movie.imdb_id}
                  </a>
                </p>
              )}
              {movie.homepage && (
                <p>
                  <span className="font-semibold">Homepage:</span>{" "}
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {movie.homepage}
                  </a>
                </p>
              )}
            </div>
            <div>
                <button className="btn btn-secondary text-white rounded-3xl" onClick={() => {handleWatchList(movie.id)}} >Add to watch List</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Badge component
function Badge({ label, color }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${color}`}
    >
      {label}
    </span>
  );
}

export default MoviePage;
