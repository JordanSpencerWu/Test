import types from "./actions";

export function setByGenres(genres) {
  return {
    type: types.SET_BY_GENRES,
    payload: { genres },
  };
}

export function setMovieDetail(movieDetail) {
  return {
    type: types.SET_MOVIE_DETAIL,
    payload: { movieDetail },
  };
}

export function setMovieGenres(movieGenres) {
  return {
    type: types.SET_MOVIE_GENRES,
    payload: { movieGenres },
  };
}

export function setPopularMovies(movies) {
  return {
    type: types.SET_POPULAR_MOVIES,
    payload: { movies },
  };
}

export function setTop5PopularMovies(movies) {
  return {
    type: types.SET_TOP_5_POPULAR_MOVIES,
    payload: { movies },
  };
}
