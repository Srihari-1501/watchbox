import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const API_KEY = import.meta.env.VITE_TMDB_KEY; 

export default function GenreBrowser() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // ✅ Use the hook

  // Fetch all genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(res.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch movies by selected genre
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!selectedGenre) return;
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
        );
        const adultFreeMovies = res.data.results.filter((movie) => movie.adult === false);
        setMovies(adultFreeMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMoviesByGenre();
  }, [selectedGenre]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Browse by Genre</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              selectedGenre === genre.id
                ? "bg-red-400 text-black"
                : "bg-white text-gray-700 hover:bg-red-300"
            }`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-black">{movie.title}</h2>
              <p className="text-sm text-gray-600">
                ⭐ {movie.vote_average} | {movie.release_date?.slice(0, 4)}
              </p>
              <div className="card-actions justify-end">
                <button
                  onClick={() =>
                    navigate("/movie/" + movie.id, {
                      // scroll to top on navigation
                      replace: false,
                    })
                  }
                  className="btn btn-primary"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
