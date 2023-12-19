/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { lazy } from "react";

const Category = lazy(() => import("./Category"));

/**
 * The Example page config.
 */
const CategoryConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "category",
      element: <Category />,
    },
  ],
};

export default CategoryConfig;
