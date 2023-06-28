// import { RouterProvider } from "react-router-dom";
// import router from "./router/routes";
import { Routes, Route, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Admin from "./pages/Admin";

// import Choose from "./components/signUp/Choose.jsx";

// thunk
import { GET_USER, USER } from "./store/authSlice.js";
import router from "./router/routes";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  function getUser() {
    dispatch(GET_USER());
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
