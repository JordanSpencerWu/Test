import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import DetailPage from "pages/DetailPage";
import DiscoverPage from "pages/DiscoverPage";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/detail/:movieId",
    component: DetailPage,
  },
  {
    path: "/discover",
    component: DiscoverPage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

export default routes;
