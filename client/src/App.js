import Home from "./pages/Home";
import SignIn from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Admin from "./pages/Admin";
// import Choose from "./components/signUp/Choose.jsx";

// thunk
import { GET_USER, USER } from "./store/authSlice.js";

function App() {
  const dispatch = useDispatch();
  async function getUser() {
    const user = await dispatch(GET_USER());
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup/password" element={<Signup page="PASSWORD" />} />
      <Route path="/signup/choose" element={<Signup page="CHOOSE" />} />
      <Route path="/singup/planform" element={<Signup page="PLANFORM" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}

export default App;
