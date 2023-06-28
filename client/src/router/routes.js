import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SignUp from "../pages/SignUp/SignUp.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    children: [],
  },
]);

export default router;
