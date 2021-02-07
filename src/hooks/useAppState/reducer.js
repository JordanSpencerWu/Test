import types from "./actions";

export const INITIAL_APP_STATE = {
  byGenres: null,
  movieCreditLookUp: {},
  movieDetailLookUp: {},
  movieGenres: null,
  popularMovies: null,
  top5PopularMovies: null,
};

function updateMovieDetailLookUp(movieDetailLookUp, movieDetail) {
  movieDetailLookUp[movieDetail.id] = movieDetail;

  return movieDetailLookUp;
}

function updateMovieCreditLookUp(movieCreditLookUp, movieId, casts, crew) {
  movieCreditLookUp[movieId] = { casts, crew };

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
          payload.casts,
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
    case types.SET_POPULAR_MOVIES:
      return { ...state, popularMovies: payload.movies };
    case types.SET_MOVIE_GENRES:
      return { ...state, movieGenres: payload.movieGenres };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}
