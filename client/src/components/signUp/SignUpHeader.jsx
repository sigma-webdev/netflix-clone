import React from "react";
import { FiLoader } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import netflixLogo from "../../assets/netflix_logo.png";

const SignUpHeader = () => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      {" "}
      {/* nav bar */}
      <nav className="flex items-center justify-between px-10 py-5 border border-b-gray-200">
        <Link to="/">
          <img className="h-8  md:h-12" src={netflixLogo} alt="netflix logo" />
        </Link>
        {/* sign-in sign-out button */}
        {loading ? (
          <FiLoader />
        ) : (
          <button
            className="text-xl font-semibold"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </button>
        )}
      </nav>
    </>
  );
};

export default SignUpHeader;
