import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY; // 🔁 Replace with your actual API key

function WatchList() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWatchList() {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      if (!user.id) return;

      try {
        const res = await axios.get("http://localhost:5000/api/watchlist", {
          params: { userId: user.id },
        });

        const movieIds = res.data.map((item) => item.movie_id); // Assuming movie_id is stored in DB

        const fetchDetailsPromises = movieIds.map((id) =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`)
        );

        const responses = await Promise.all(fetchDetailsPromises);
        const movies = responses.map((r) => r.data);

        setMovieDetails(movies);
      } catch (err) {
        console.error("Error fetching watchlist or movie details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchList();
  }, []);

  return (

    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-6">
        <hr />
        <h1 className="text-4xl py-5 font-bold mb-4 text-center">Your Watch List</h1>
        <hr />
        {loading ? (
          <p className="text-gray-400">Loading watch list...</p>
        ) : movieDetails.length === 0 ? (
          <p className="text-gray-400">No movies found in your watch list.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
            {movieDetails.map((movie) => (
              <div key={movie.id} onClick={() => navigate('/movie/'+ movie.id)} className="bg-gray-800 p-4 rounded-lg shadow hover:bg-white transition-opacity duration-1000 hover:text-black">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-100 object-cover rounded"
                />
                <h2 className="mt-2 text-lg font-semibold">{movie.title}</h2>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default WatchList;
