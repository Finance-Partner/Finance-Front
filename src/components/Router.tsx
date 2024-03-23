import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../screen/Home";
import Auth from "../screen/Auth";
import Calendar from "../screen/Calendar";
import Chart from "../screen/Chart";
import Login from "./Login";
import Register from "./Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      { path: "calendar", element: <Calendar /> },
      { path: "chart", element: <Chart /> },
      {
        path: "auth",
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
    ],
  },
]);

export default router;
