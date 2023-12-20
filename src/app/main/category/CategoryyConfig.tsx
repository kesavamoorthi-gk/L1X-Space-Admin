/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { lazy } from "react";

const Category = lazy(() => import("./Categoryy"));

/**
 * The Example page config.
 */
const CategoryyConfig = {
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

export default CategoryyConfig;
