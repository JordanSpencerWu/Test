import { parse } from "path";

const POPULARITY = "Popularity";
const TITLE = "Title";
const RATING = "Rating";

function sortByPopularity(movies) {
  const compare = (a, b) => parseFloat(a.popularity) - parseFloat(b.popularity);

  return movies.sort(compare);
}

function sortByTitle(movies) {
  const compare = (a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  return movies.sort(compare);
}

function sortByRating(movies) {
  const compare = (a, b) =>
    parseFloat(a.vote_average) - parseFloat(b.vote_average);

  return movies.sort(compare);
}

export const SORT_OPTIONS = [POPULARITY, TITLE, RATING];

export function sortMovies(movies, option) {
  switch (option) {
    case POPULARITY:
      return sortByPopularity(movies);
    case TITLE:
      return sortByTitle(movies);
    case RATING:
      return sortByRating(movies);
    default:
      throw new Error(`Unhandled option: ${option}`);
  }
}
