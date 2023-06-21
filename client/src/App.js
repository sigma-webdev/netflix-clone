import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Admin from "./pages/Admin";
// import Choose from "./components/signUp/Choose.jsx";

// thunk
import { GET_USER, USER } from "./store/authSlice.js";

function App() {
  const dispatch = useDispatch();
  async function getUser() {
    await dispatch(GET_USER());
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
      <Route
        path="/signup/registration"
        element={<SignUp page="REGISTRATION" />}
      />
      <Route path="/signup/regform" element={<SignUp page="REG_FORM" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/watch/:contentId" element={<Watch />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route
        path="/forgotpassword"
        element={<SignUp page="FORGOT_PASSWORD" />}
      />
      <Route path="/resetpassword" element={<SignUp page="RESET_PASSWORD" />} />
      <Route path="/loginhelp" element={<SignUp page="LOGIN_HELP" />} />
    </Routes>
  );
}

export default App;
