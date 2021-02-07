const path = {
  toHome: () => "/",
  toDetail: (id) => `/detail/${id}`,
  toDiscoverByGenre: (genreId) => `/discover?genreId=${genreId}`,
};

export default path;
