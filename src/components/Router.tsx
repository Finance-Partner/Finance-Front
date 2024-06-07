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
import ProtectedRoute from "./ProtectedRoute"; // 방금 만든 ProtectedRoute 컴포넌트 import

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            ),
          },
          {
            path: "householder",
            element: (
              <ProtectedRoute>
                <HouseHolder />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "overview",
                element: (
                  <ProtectedRoute>
                    <Overview />
                  </ProtectedRoute>
                ),
              },
              {
                path: "detail",
                element: (
                  <ProtectedRoute>
                    <Detail />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          {
            path: "budget",
            element: (
              <ProtectedRoute>
                <Budget />
              </ProtectedRoute>
            ),
          },
          {
            path: "analysis",
            element: (
              <ProtectedRoute>
                <Analysis />
              </ProtectedRoute>
            ),
          },
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
