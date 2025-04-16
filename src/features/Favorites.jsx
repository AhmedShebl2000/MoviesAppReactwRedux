import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "./moviesSlice";
import MovieCard from "./MovieCard";

function Favorites() {
  const dispatch = useDispatch();
  const { favoriteMovies } = useSelector((store) => store.movies);

  function handleRemoveFromFavorites(movieID) {
    console.log(movieID);
    let tempFavoriteMovies = favoriteMovies.slice();
    let indexToDelete = tempFavoriteMovies.findIndex(
      (movie) => movie.imdbID === movieID
    );
    console.log(indexToDelete);
    tempFavoriteMovies.splice(indexToDelete, 1);
    console.log(tempFavoriteMovies);

    localStorage.clear("favorites");
    let newStorage = JSON.stringify(tempFavoriteMovies);
    localStorage.setItem("favorites", newStorage);
    dispatch(getFromLocalStorage());
  }

  useEffect(() => {
    dispatch(getFromLocalStorage());
  }, [dispatch]);

  console.log(favoriteMovies);

  if (favoriteMovies.length == 0)
    return (
      <div className="flex flex-col justify-center min-h-screen gap-10">
        <h1 className="text-center text-3xl mb-10">
          You don't have any favorites yet!
        </h1>
      </div>
    );
  return (
    <div className="flex flex-col justify-center min-h-screen gap-10">
      <h1 className="text-center text-3xl mb-10">YOUR FAVORITE MOVIES:</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-4 gap-4">
        {favoriteMovies
          ? favoriteMovies.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex flex-col justify-between p-4"
              >
                <MovieCard movie={movie} />
                <button
                  onClick={() => {
                    handleRemoveFromFavorites(movie.imdbID);
                  }}
                  className="bg-red-400 py-2 rounded-sm cursor-pointer"
                >
                  Remove from favorites
                </button>
              </div>
            ))
          : "No Favorites Yet!"}
        <li></li>
      </ul>
    </div>
  );
}

export default Favorites;
