import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecentStories(props) {
  const apiKey = import.meta.env.VITE_NEWS_KEY;

  const [story, setstory] = useState([]);

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=entertainment&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setstory(data.articles.slice(0, props.stories));
        } else {
          console.error("Error fetching articles:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [props.stories, apiKey]);

  return (
    <div id="trendingstory" className="py-5 bg-gray-900">
      <hr />
      <h1 className="font-bold text-5xl text-center my-5">Recent Stories</h1>
      <hr />
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 my-10 place-items-center mx-auto px-5 max-w-7xl">
        {story.map((news, index) => (
          <div
            className="card bg-white text-black shadow-sm hover:scale-105 transition-transform duration-300"
            key={index}
          >
            <figure>
              <img
                src={news.urlToImage }
                alt={news.title || "News"}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{news.title}</h2>
              <div className="card-actions justify-end">
                <a
                  href={news.url}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Know More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentStories;
