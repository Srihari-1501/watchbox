import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import MoviePage from "./pages/MoviePage";
import TrendingMovies from "./components/TrendingMovies";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import RecentStories from "./components/RecentStories";
import GenreBrowser from "./pages/GenreBrowser";
import SearchPage from "./pages/SearchPage";
import WatchList from "./pages/WatchList";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/movie/:id",
    element: <MoviePage />,
  },
  {
    path: "/trending",
    element: 
    <div>
      <NavBar />
      <div className="py-5">
        <TrendingMovies movie="16" />
      </div>
      
      <Footer />
    </div>,
  },
  {
    path: "/stories",
    element: 
    <div>
      <NavBar />
      <RecentStories stories="12" />
      <Footer />
    </div>,
  },
  {
    path: "/genre",
    element: <GenreBrowser />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/watchlist",
    element: <WatchList />,
  }

]);  

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
