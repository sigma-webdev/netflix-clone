import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// icons
import netflixLogo from "../assets/netflix_logo.png";
import { Loading } from "../components/icons";
//components
import Registration from "../components/signUp/Registration.jsx";
import RegForm from "../components/signUp/RegForm.jsx";
import Password from "../components/signUp/Password.jsx";
import Choose from "../components/signUp/Choose";
import PlanForm from "../components/signUp/PlanForm";
import ResetPassword from "../components/signUp/ResetPassword.jsx";
import LoginHelp from "../components/signUp/LoginHelp.jsx";
import ForgotPassword from "../components/signUp/ForgotPassword.jsx";
import SignOut from "../components/signUp/SignOut";
// thunk
import { SIGN_OUT } from "../store/authSlice";
import PaymentSuccess from "../components/signUp/PaymentSuccess";
const SignUp = ({ page, theme = "light" }) => {
  const GET_USER_LOADING = useSelector((state) => state.auth.getUserLoading);
  const SIGN_IN_LOADING = useSelector((state) => state.auth.signInLoading);
  const SIGN_OUT_LOADING = useSelector((state) => state.auth.signOutLoading);
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setButtonLoading(GET_USER_LOADING || SIGN_IN_LOADING || SIGN_OUT_LOADING);
  }, [GET_USER_LOADING, SIGN_IN_LOADING, SIGN_OUT_LOADING]);

  const IS_LOGGED_IN = useSelector((state) => state.auth.isLoggedIn);

  async function handleSignOut() {
    const response = await dispatch(SIGN_OUT());
    if (response.payload.success) {
      navigate("/signup/signout");
    }
  }

  return (
    <div
      className={page === "SIGN_OUT" ? "bg-netflix-signUp object-cover" : null}
    >
      {/* nav bar */}
      <nav
        className={
          page === "SIGN_OUT"
            ? "flex  justify-between items-center px-3 md:px-10 h-16 md:h-24 "
            : "flex  justify-between items-center px-3 md:px-10 h-16 md:h-24 border-b-[1px] border-gray"
        }
      >
        <Link to="/">
          <img className="h-8  md:h-12" src={netflixLogo} alt="netflix logo" />
        </Link>
        {/* sign-in sign-out button */}
        {buttonLoading ? (
          <Loading color="black" />
        ) : (
          <button
            onClick={() => {
              {
                IS_LOGGED_IN ? handleSignOut() : navigate("/signin");
              }
            }}
            className={
              page === "SIGN_OUT"
                ? "font-bold  text-white text-lg border-black  border-b-[3px] hover:border-white cursor-pointer "
                : "font-bold  text-[#333] text-lg border-white  border-b-[3px] hover:border-black cursor-pointer "
            }
          >
            {IS_LOGGED_IN ? "Sign out" : "Sign In"}
          </button>
        )}
        {/* sign-in sign-out button */}
      </nav>

      <div className="flex justify-center  items-center h-[90vh]">
        {page === "PASSWORD" ? <Password /> : null}
        {page === "REGISTRATION" ? <Registration /> : null}
        {page === "REG_FORM" ? <RegForm /> : null}
        {page === "PLAN_FORM" ? <PlanForm /> : null}
        {page === "CHOOSE" ? <Choose /> : null}
        {page === "FORGOT_PASSWORD" ? <ForgotPassword /> : null}
        {page === "RESET_PASSWORD" ? <ResetPassword /> : null}
        {page === "LOGIN_HELP" ? <LoginHelp /> : null}
        {page === "SIGN_OUT" ? <SignOut /> : null}
        {page === "PAYMENT_SUCCESS" ? <PaymentSuccess /> : null}
        {page === "PAYMENT_FAIL" ? <PaymentSuccess /> : null}
      </div>

      <footer
        className={page === "SIGN_OUT" ? "bg-black p-8" : "bg-[#f3f3f3] p-8"}
      >
        <p className="text-[#848484] text-lg">Questions?</p>
        <ul className="text-[#848484] flex justify-evenly">
          <li>FAQ</li>
          <li>Help center</li>
          <li>Netflix Shop</li>
          <li>Terms of Use</li>
          <li>Privacy</li>
          <li> Cookie preference</li>
          <li></li>
        </ul>
      </footer>
    </div>
  );
};

export default SignUp;
