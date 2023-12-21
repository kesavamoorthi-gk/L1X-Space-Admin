import { lazy } from "react";
import { Navigate } from "react-router-dom";
import lazyWithReducer from "app/store/lazyWithReducer";
import reducer from "./store";

const CategoryApp = lazyWithReducer(
  "categoriesApp",
  () => import("./CategoryApp"),
  reducer
);
const Category = lazy(() => import("./category/Category"));
const Categories = lazy(() => import("./categories/Categories"));

/**
 * The Category app configuration.
 */
const CategoryAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "",
      element: <CategoryApp />,
      children: [
        {
          path: "",
          element: <Navigate to="categories" />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "categories/:categoryId/*",
          element: <Category />,
        },
      ],
    },
  ],
};

export default CategoryAppConfig;
