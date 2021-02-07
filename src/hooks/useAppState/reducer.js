import types from "./actions";

export const INITIAL_APP_STATE = {
  // List of genre to show on HomePage
  byGenres: null,
  // Lookup table for movie credit by movie id
  movieCreditLookUp: {},
  // Look up table for movie detail by movie id
  movieDetailLookUp: {},
  // List of all movie genre
  movieGenres: null,
  // List of movies by genre
  moviesByGenre: null,
  // List of popular movies
  popularMovies: null,
  // List of 5 popular movies
  top5PopularMovies: null,
};

function updateMovieDetailLookUp(movieDetailLookUp, movieDetail) {
  movieDetailLookUp[movieDetail.id] = movieDetail;

  return movieDetailLookUp;
}

function updateMovieCreditLookUp(movieCreditLookUp, movieId, cast, crew) {
  movieCreditLookUp[movieId] = { cast, crew };

  return movieCreditLookUp;
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_BY_GENRES:
      return { ...state, byGenres: payload.genres };
    case types.SET_MOVIE_CREDIT:
      return {
        ...state,
        movieCreditLookUp: updateMovieCreditLookUp(
          state.movieCreditLookUp,
          payload.movieId,
          payload.cast,
          payload.crew
        ),
      };
    case types.SET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetailLookUp: updateMovieDetailLookUp(
          state.movieDetailLookUp,
          payload.movieDetail
        ),
      };
    case types.SET_TOP_5_POPULAR_MOVIES:
      return { ...state, top5PopularMovies: payload.movies };
    case types.SET_MOVIES_BY_GENRE:
      return { ...state, moviesByGenre: payload.movies };
    case types.SET_POPULAR_MOVIES:
      return { ...state, popularMovies: payload.movies };
    case types.SET_MOVIE_GENRES:
      return { ...state, movieGenres: payload.movieGenres };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}
