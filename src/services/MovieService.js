import { TMBD_API_TOKEN_V3 } from "./../config";
import queryString from "query-string";

const BASE_URL = "https://api.themoviedb.org/3";

const MovieService = {
  getMovieGenres: async () => {
    const queryOptions = {
      api_key: TMBD_API_TOKEN_V3,
      language: "en",
    };
    const url = `${BASE_URL}/genre/movie/list?${queryString.stringify(
      queryOptions
    )}`;

    const response = await fetch(url);
    const { genres } = await response.json();

    const byGenres = genres.slice(0, 4);
    const movieGenres = genres.reduce((acc, genre) => {
      const { id, name } = genre;
      acc[id] = name;

      return acc;
    }, {});

    return {
      byGenres,
      movieGenres,
    };
  },
  getPopular: async () => {
    const queryOptions = {
      api_key: TMBD_API_TOKEN_V3,
      language: "en",
      page: 1,
    };
    const url = `${BASE_URL}/movie/popular?${queryString.stringify(
      queryOptions
    )}`;

    const response = await fetch(url);
    const { results: movies } = await response.json();

    return movies;
  },
};

export default MovieService;
