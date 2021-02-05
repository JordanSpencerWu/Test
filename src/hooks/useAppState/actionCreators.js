import types from "./actions";

export function setTop5PopularMovies(movies) {
  return {
    type: types.SET_TOP_5_POPULAR_MOVIES,
    payload: { movies },
  };
}
