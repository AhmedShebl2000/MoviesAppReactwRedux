import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/moviesSlice";
import MovieCard from "../features/MovieCard";

function Home() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const {
    movies: moviesList,
    isLoading,
    error,
  } = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch(fetchMovies(search));
  }, [dispatch, search]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-12">
      <div className="w-full max-w-md mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Movie Explorer
        </h1>
        <p className="text-indigo-300 mb-2 font-medium">
          Search for a movie/series
        </p>
        <div className="relative">
          <input
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter movie title..."
          />
          {search && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="w-full">
        {isLoading ? (
          <div className="text-center py-10 text-xl text-indigo-300">
            <svg
              className="animate-spin h-10 w-10 mx-auto mb-4 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading movies...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-xl text-red-400">
            <p className="mb-2">Something went wrong</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        ) : moviesList && moviesList.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesList.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-xl text-gray-400">
            {search
              ? "No movies found. Try a different search term."
              : "Search for a movie to get started."}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
