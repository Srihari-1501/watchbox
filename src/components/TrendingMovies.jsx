import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 


function TrendingMovies(props) {
  
  const apiKey = import.meta.env.VITE_TMDB_KEY;

  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results.slice(0, props.movie)));
  }, [props.movie,apiKey]);

  if (!movies || movies.length === 0) {
    return <p className="text-gray-400 text-center">Loading Trending Movies...</p>;
  } 


  return (
    <>
      <div id="trendingMovies" className="my-5 mb-30 bg-gray-900 text-white">
        <hr />
        <h1 className="font-bold text-5xl text-center my-5">Trending Movies</h1>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 my-10 place-items-center mx-auto px-5 max-w-7xl">
          {movies.map((movie) => (
            <div className="card bg-white text-black shadow-sm hover:scale-105 transition-transform duration-300" onClick={() => navigate('/movie/'+ movie.id)} key={movie.id}>
              <figure>
                <img className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{movie.title}</h2>
                {/* <p className="text-gray-700">{movie.overview.slice(0, 150)}...</p> */}
                {/* <p><span className="font-bold">Realease Date:</span> {movie.release_date}</p> */}
                <div className="flex gap-0.5">
                  <p className="badge badge-warning justify-center">{movie.media_type}</p>  
                <p className="badge badge-secondary justify-center">{movie.vote_average}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrendingMovies;
