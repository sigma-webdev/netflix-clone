import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import netflixLogo from "../../assets/netflix_logo.png";
import { SIGN_OUT } from "../../store/authSlice";
import { FiLoader } from "react-icons/fi";
import SignUpHeader from "../../components/signUp/SignUpHeader";
import SignUpFooter from "../../components/signUp/SignUpFooter";

const SignUp = () => {
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const IS_LOGGED_IN = useSelector((state) => state.auth.isLoggedIn);

  async function handleSignOut() {
    const response = await dispatch(SIGN_OUT());
    if (response.payload.success) {
      navigate("/signup/signout");
    }
  }

  return (
    <div>
      {/* adding the navigation menu */}
      <SignUpHeader />

      {/* adding the footer */}
      <SignUpFooter />
    </div>
  );
};

export default SignUp;
