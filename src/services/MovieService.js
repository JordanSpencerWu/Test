import { TMBD_API_TOKEN_V3 } from "./../config";
import queryString from "query-string";

const BASE_URL = "https://api.themoviedb.org/3";

const MovieService = {
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
    const { results } = await response.json();

    return results;
  },
};

export default MovieService;
