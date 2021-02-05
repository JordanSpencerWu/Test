import { useReducer } from "react";

const initialState = {
  popularMovies: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setPopularMovies":
      return { ...state, popularMovies: [1] };
    default:
      return state;
  }
}

function useAppState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
}

export default useAppState;
