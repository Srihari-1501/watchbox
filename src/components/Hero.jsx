import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Hero() {
  const [backDrop, setBackDrop] = useState(null);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const backdrop_path = data.results[0].backdrop_path;
          setBackDrop(`https://image.tmdb.org/t/p/original${backdrop_path}`);
          
        }
      });
  }, [apiKey]);



  return (
    <div className="hero min-h-[80vh] max-w-6xl mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        {backDrop && (
          <img
            src={backDrop}
            alt="Trending Movie Backdrop"
            className="max-w-xl rounded-lg shadow-2xl w-full"
          />
        )}
        <div>
          <h1 className="text-5xl font-bold">
            Discover Your <br /> Next Favorite Movie
          </h1>
          <p className="py-6">
            Find detailed information on your favorite movies including cast,
            ratings, release dates, plot summaries, and more. Whether you're
            into thrillers, rom-coms, or classic Tamil cinema — we've got you
            covered.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/search", { replace: false })}
              className="btn btn-error"
            >
              Search for Movie
            </button>
            <button
              onClick={() => navigate("/genre", { replace: false })}
              className="btn btn-primary"
            >
              Sort by Genre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
