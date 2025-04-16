import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "./moviesSlice";
import MovieDetailsCard from "./MovieDetailsCard";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentMovieDetails } = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  console.log(currentMovieDetails);
  return (
    <div>
      <MovieDetailsCard movie={currentMovieDetails} />
    </div>
  );
}

export default MovieDetails;
