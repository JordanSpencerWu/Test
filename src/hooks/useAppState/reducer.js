import types from "./actions";

export const INITIAL_APP_STATE = {
  byGenres: null,
  movieDetailLookUp: {},
  movieGenres: null,
  popularMovies: null,
  top5PopularMovies: null,
};

function updateMovieDetailLookUp(movieDetailLookUp, newMovieDetail) {
  movieDetailLookUp[newMovieDetail.id] = newMovieDetail;

  return movieDetailLookUp;
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_BY_GENRES:
      return { ...state, byGenres: payload.genres };
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
