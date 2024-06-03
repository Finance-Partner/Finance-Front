import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../screen/Home";
import Auth from "../screen/Auth";
import Login from "./Login";
import Register from "./Register";
import Main from "../screen/Main";
import HouseHolder from "./home/HouseHolder";
import Budget from "./home/Budget";
import Analysis from "./home/Analysis";
import DashBoard from "./home/DashBoard";
import Overview from "./home/calendar/Overview";
import Detail from "./home/calendar/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          { path: "dashboard", element: <DashBoard /> },
          {
            path: "householder",
            element: <HouseHolder />,
            children: [
              {
                path: "overview",
                element: <Overview />,
              },
              { path: "detail", element: <Detail /> },
            ],
          },
          { path: "budget", element: <Budget /> },
          { path: "analysis", element: <Analysis /> },
        ],
      },
    ],
  },
  {
    path: "/preview",
    element: <Main />,
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
