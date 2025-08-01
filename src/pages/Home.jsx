import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import RecentStories from "../components/RecentStories";
import TrendingMovies from "../components/TrendingMovies";
import Hero from "../components/Hero";

function Home() {
    return (
    <div className="bg-gray-900 text-white">
      <NavBar />
      <Hero />
      <TrendingMovies movie={8} />
      <RecentStories stories={6} />
      <Footer />
    </div>
    );
}

export default Home;