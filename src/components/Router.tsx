import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../screen/Home";
import Auth from "../screen/Auth";
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
