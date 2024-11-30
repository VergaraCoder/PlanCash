import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home";
import { Layout } from "../components/layout/layout";
import { Register } from "../pages/Register";
import { Main } from "../pages/MainComponent";


export const Router= createBrowserRouter([
    {
        path: "/pages",
        Component: Layout,
        children: [
          {path: "register",Component: Home},
          {path: "home",Component: Main},
        ]
      },
]);