import HomePage from "pages/HomePage";
import NotFoundPage from "pages/NotFoundPage";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

export default routes;
