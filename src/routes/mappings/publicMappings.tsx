import { RouteObject } from "react-router-dom";
import { mainPaths } from "../paths/mainPaths";
import LanguagePage from "../../pages/LanguagePage/LanguagePage";

export const publicMappings: RouteObject[] = [
  {
    path: mainPaths.Language,
    element: <LanguagePage />,
  },
];
