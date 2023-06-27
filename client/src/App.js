import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
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
  function getUser() {
    dispatch(GET_USER());
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* auth */}
      <Route path="/signup/password" element={<SignUp page="PASSWORD" />} />
      <Route path="/signup/choose" element={<SignUp page="CHOOSE" />} />
      <Route path="/signup/planform" element={<SignUp page="PLAN_FORM" />} />
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
      <Route
        path="/resetpassword/:resetPasswordToken"
        element={<SignUp page="RESET_PASSWORD" />}
      />
      <Route path="/loginhelp/:email" element={<SignUp page="LOGIN_HELP" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="signup/signout" element={<SignUp page="SIGN_OUT" />} />
      <Route
        path="signup/paymentsuccess"
        element={<SignUp page="PAYMENT_SUCCESS" />}
      />
      <Route
        path="signup/paymentfail"
        element={<SignUp page="PAYMENT_FAIL" />}
      />
      <Route path="/browse" element={<Browse />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
}

export default App;
