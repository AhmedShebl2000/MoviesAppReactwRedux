import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  function handleClick() {
    console.log(movie.imdbID);
    navigate(`/movies/${movie.imdbID}`);
  }

  return (
    <li
      onClick={handleClick}
      className="p-4 hover:scale-105 shadow-2xl shadow-white-500/20"
    >
      <img src={movie.Poster} className="m-auto cursor-pointer" width="250px" />
      <div className="text-center">{movie.Title}</div>
      <div className="text-center">({movie.Year})</div>
    </li>
  );
}

export default MovieCard;
