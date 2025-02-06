import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CircularLoader from "../../loader/CircularLoader";
import { SIGN_OUT } from "../../../store/authSlice";
import netflixLogo from "./../../../assets/logos/netflix_logo.png";

const HomeHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showSignIn, setShowSignIn] = useState(false);

  const IS_LOGGED_IN = useSelector((state) => state?.auth?.isLoggedIn);
  const IS_LOADING = useSelector((state) => state?.auth?.loading);

  const handleSignInSignOut = async () => {
    if (!IS_LOGGED_IN) return navigate("/signin");
    const response = await dispatch(SIGN_OUT());
    if (response?.payload?.success) {
      navigate("/logout");
    }
  };

  useEffect(() => {
    if (location.pathname === "/signin") {
      setShowSignIn(true);
    }
  }, [location.pathname]);

  return (
    <header className="absolute z-50 flex h-16 w-full items-center justify-between px-4 text-white transition duration-300 ease-in-out md:h-20 md:px-8">
      <div className="md:text-md flex gap-4 text-sm">
        <div className="w-16 md:w-32">
          <Link to="/">
            <img src={netflixLogo} alt="netflix logo" className="w-full" />
          </Link>
        </div>
      </div>

      {showSignIn ? null : (
        <button
          type="button"
          className="rounded border-2 border-red-600 bg-red-600 px-3 py-1 text-white"
          disabled={IS_LOADING}
          onClick={() => {
            handleSignInSignOut();
          }}
        >
          {IS_LOADING ? (
            <CircularLoader />
          ) : (
            <>{IS_LOGGED_IN ? "Sign out" : "Sign In"}</>
          )}
        </button>
      )}
    </header>
  );
};

export default HomeHeader;
