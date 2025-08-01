import Login from "../pages/Login";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

function NavBar() {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login"; // Redirect to login page after logout
    
  }


  return (
    <div className="navbar shadow-sm lg:px-15 lg:py-5 bg-gray-900 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
            <li>
              <Link to="/trending">Trending Movies</Link>
            </li>
            <li>
              <Link to="/stories">Recent Stories</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">WatchBox</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/watchlist" className="">
              Watchlist
            </Link>
          </li>
          <li>
            <Link to="/trending">Trending Movies</Link>
          </li>
          <li>
            <Link to="/stories">Recent Stories</Link>
          </li>
        </ul>
      </div>
      {user ? (
        <div className="navbar-end flex gap-4">
          <span className="text-lg font-bold">Hello, {user.username}</span>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </div>

      ) : (
        <div className="navbar-end">
          <Link to="/login" className="btn btn-outline ">Login</Link>
        </div>
      )}
      
    </div>
  );
}

export default NavBar;
