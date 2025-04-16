import { useNavigate } from "react-router-dom";

function MovieDetailsCard({ movie }) {
  const navigate = useNavigate();

  const [imdbRating, rottenTomatoes, metaCritic] = movie.Ratings || [];

  function handleAddToFavorites() {
    //Save to local storage

    let storage = JSON.parse(localStorage.getItem("favorites")) || [];
    storage.push(movie);
    localStorage.setItem("favorites", JSON.stringify(storage));

    navigate("/favorites");
  }

  if (!movie || !movie.Title) {
    return <p className="text-white text-center">Loading...</p>;
  }
  return (
    <div className="bg-gray-900 p-6 lg:p-8 lg:w-[70%] lg:m-auto sm:w-full">
      <div className="flex flex-col items-start gap-5">
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-600 px-4 py-2 rounded-sm cursor-pointer"
        >
          &#8592; Back to Movies
        </button>
        <div className="md:flex md:flex-row gap-5 sm:flex-col">
          <div className="flex flex-col md:gap-4 md:w-1/3 gap-6">
            {movie.Poster ? (
              <img
                src={movie.Poster}
                className="w-full md:h-auto md:object-cover rounded-md"
                alt={movie.Title}
              />
            ) : (
              "Poster Unavailable"
            )}
            <button
              onClick={handleAddToFavorites}
              className="bg-indigo-600 px-4 py-2 rounded-full cursor-pointer"
            >
              Add to favorites
            </button>
          </div>
          <div className="flex flex-col md:gap-2 gap-4 md:w-2/3">
            {movie.Title ? (
              <h1 className="text-3xl font-bold mt-2 md:mt-0">{movie.Title}</h1>
            ) : (
              "Title Unavailable"
            )}
            <div className="flex md:gap-4 gap-6 md:justify-start justify-between mt-2">
              {movie.Year ? (
                <span className="bg-indigo-600 px-3 py-1 rounded-full flex-1 md:flex-none text-center">
                  {movie.Year}
                </span>
              ) : (
                ""
              )}
              {movie.Rated ? (
                <span className="bg-red-600 px-3 py-1 rounded-full flex-1 md:flex-none  text-center">
                  {movie.Rated == "R" ? "R-Rated" : movie.Rated}
                </span>
              ) : (
                ""
              )}
              {movie.Runtime ? (
                <span className="bg-gray-700 px-3 py-1 rounded-full flex-1 md:flex-none  text-center">
                  {movie.Runtime}
                </span>
              ) : (
                ""
              )}
            </div>
            {movie.Plot ? (
              <>
                <p className="text-indigo-400 text-xl mt-1">Plot</p>
                <p className="text-gray-300">{movie.Plot}</p>
              </>
            ) : (
              ""
            )}

            <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-2">
              <div>
                <p className="text-indigo-400 text-xl mt-1">Director</p>
                {movie.Director ? <p>{movie.Director}</p> : "Unknown"}
                <div>
                  <p className="text-indigo-400 text-xl mt-1">Cast</p>
                  {movie.Actors ? <p>{movie.Actors}</p> : "Unkown"}
                </div>
              </div>
              <div>
                <p className="text-indigo-400 text-xl mt-1">Writer</p>
                {movie.Writer ? <p>{movie.Writer}</p> : "Unkown"}
                <div>
                  <p className="text-indigo-400 text-xl mt-1">Genre</p>
                  {movie.Genre ? (
                    <div className="flex gap-2">
                      {movie.Genre &&
                        movie.Genre.split(",").map((genre, i) => (
                          <p
                            key={i}
                            className="py-1 px-2 bg-gray-500 rounded-sm"
                          >
                            {genre}
                          </p>
                        ))}
                    </div>
                  ) : (
                    "Unkown"
                  )}
                </div>
              </div>
            </div>

            <p className="text-indigo-400 text-xl">Ratings</p>
            {/* <div className="w-full"> */}
            {movie.Ratings ? (
              <div className="flex gap-2 md:flex-row flex-col">
                {imdbRating?.Value && (
                  <div className="bg-gray-800 py-2 px-3 rounded-sm  md:w-1/3 w-full">
                    <p className="text-gray-400">IMDB Rating</p>
                    <p className="font-bold">{imdbRating.Value}</p>
                  </div>
                )}

                {rottenTomatoes?.Value && (
                  <div className="bg-gray-800 py-2 px-3 rounded-sm  md:w-1/3 w-full">
                    <p className="text-gray-400">Rotten Tomatoes</p>
                    <p className="font-bold">{rottenTomatoes.Value}</p>
                  </div>
                )}

                {metaCritic?.Value && (
                  <div className="bg-gray-800 py-2 px-3 rounded-sm  md:w-1/3 w-full">
                    <p className="text-gray-400">Metacritic</p>
                    <p className="font-bold">{metaCritic.Value}</p>
                  </div>
                )}
              </div>
            ) : (
              "Unkown"
            )}
            {/* </div> */}
            <div className="flex md:gap-2 gap-4 md:flex-row flex-col">
              {movie.Language ? (
                <div className="flex flex-col md:w-1/3 w-full">
                  <p className="text-gray-400">Language</p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {movie.Language.split(",").map((language, i) => (
                      <p key={i} className="py-1 px-2 bg-gray-500 rounded-sm">
                        {language}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col md:w-1/3 w-full flex-wrap">
                <p className="text-gray-400">Country</p>
                {movie.Country ? <p>{movie.Country}</p> : "Unkown"}
              </div>
              <div className="flex flex-col md:w-1/3 w-full flex-wrap">
                <p className="text-gray-400">Awards</p>
                {movie.Awards ? <p>{movie.Awards}</p> : "Unkown"}
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-2">
              <div className="md:w-1/3 w-full">
                <p className="text-gray-400">Box Office</p>
                {movie.BoxOffice ? <p>{movie.BoxOffice}</p> : "Unkown"}
              </div>

              <div className="md:w-1/3 w-full">
                <p className="text-gray-400">Release Date</p>
                {movie.Released ? <p>{movie.Released}</p> : "Unkown"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsCard;
