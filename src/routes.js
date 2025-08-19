import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./components/AppLayout"
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserCreate from "./pages/UserCreate";
import UserEdit, { userLoader } from "./pages/UserEdit";
import RequireAuth from "./auth/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />
  },
  {
    path: "/",
    element: <RequireAuth><AppLayout /></RequireAuth>,
    children: [
      {
        index: true,
        element: <RequireAuth><Home /></RequireAuth>,
      },
      {
        path: "users",
        element: <RequireAuth><Users /></RequireAuth>,
      },
      {
        path: "users/new",
        element: <UserCreate />
      },
      {
        path: "users/:userId",
        element: <RequireAuth><UserEdit /></RequireAuth>,
        loader: userLoader,
      },
    ]
  },
]);

export default router;
