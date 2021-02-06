import types from "./actions";

export const INITIAL_APP_STATE = {
  top5PopularMovies: null,
  movieGenres: null,
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_TOP_5_POPULAR_MOVIES:
      return { ...state, top5PopularMovies: payload.movies };
    case types.SET_MOVIE_GENRES:
      return { ...state, movieGenres: payload.movieGenres };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}