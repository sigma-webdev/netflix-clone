import Home from "./pages/Home";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
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
      <Route path="/signup/password" element={<SignUp page="PASSWORD" />} />
      <Route path="/signup/choose" element={<SignUp page="CHOOSE" />} />
      <Route path="/singup/planform" element={<SignUp page="PLAN_FORM" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
