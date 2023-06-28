import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import SignUp from "../pages/SignUp/SignUp.js";
import Browse from "../pages/Browse";
import Watch from "../pages/Watch";

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
  {
    path: "/browse",
    element: <Browse />,
    children: [],
  },
  {
    path: "/watch/:contentId",
    element: <Watch />,
    children: [],
  },
]);

export default router;
