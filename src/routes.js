import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import MovieDetailPage from "pages/MovieDetailPage";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/detail/:movieId",
    component: MovieDetailPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

export default routes;
