import { RouteObject } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import { authMappings } from "./mappings/authMappings";
import { publicMappings } from "./mappings/publicMappings";

export const combineRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [...authMappings, ...publicMappings],
  },
];
