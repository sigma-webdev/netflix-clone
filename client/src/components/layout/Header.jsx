import netflixLogo from "./../../assets/netflix_logo.png";
import { IconContext } from "react-icons/lib";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
// icons
import { SearchIcon } from "../icons";
import { Loading } from "../icons.jsx";
// THUNK
import { SIGN_OUT } from "../../store/authSlice.js";
import Menu from "../menu/Menu";
import netflixAvatar from "../../assets/netflix-avtar.jpg";
import { FaSignOutAlt } from "react-icons/fa";
import {
  fetchContentByCategory,
  fetchContentBySearch,
} from "../../store/contentSlice";

const Header = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const IS_LOGGED_IN = useSelector((state) => state.auth.isLoggedIn);
  const GET_USER_LOADING = useSelector((state) => state.auth.getUserLoading);
  const SIGN_OUT_LOADING = useSelector((state) => state.auth.signOutLoading);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setButtonLoading(GET_USER_LOADING || SIGN_OUT_LOADING);
  }, [GET_USER_LOADING, SIGN_OUT_LOADING]);

  const headerRef = useRef(null);

  const scrollHandler = () => {
    if (window.scrollY > 10) {
      headerRef.current.style.backgroundColor = "black";
    } else {
      headerRef.current.style.backgroundColor = "transparent";
    }
  };

  useEffect(() => {
    if (isLogin) {
      window.addEventListener("scroll", scrollHandler);
    }

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  async function handleSignInSignOut() {
    if (!IS_LOGGED_IN) return navigate("/signin");

    const response = await dispatch(SIGN_OUT());

    if (response.payload.success) {
      navigate("signup/signout");
    }
  }

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    dispatch(
      fetchContentBySearch({ searchText, userId: "64789b082f388ccff2e33eaa" })
    );
  };

  const handleCategory = (contentType) => {
    dispatch(
      fetchContentByCategory({
        contentType,
        userId: "64789b082f388ccff2e33eaa",
      })
    );
  };

  return (
    <header
      ref={headerRef}
      className={`z-20 flex h-16 w-full items-center justify-between px-4 text-white transition duration-300 ease-in-out md:h-20 md:px-8 ${
        isLogin ? "fixed top-0" : "absolute"
      }`}
    >
      <div className="md:text-md flex gap-4 text-sm">
        <div className={isLogin ? "w-16 md:w-24" : "w-16 md:w-32"}>
          <Link to="/">
            <img src={netflixLogo} alt="netflix logo" className="w-full" />
          </Link>
        </div>
        {/* login  */}
        {isLogin ? (
          <div className="flex items-center">
            <nav>
              <ul className="hidden gap-4 md:flex ">
                <li
                  className="cursor-pointer"
                  onClick={() => handleCategory("")}
                >
                  Home
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => handleCategory("Movies")}
                >
                  Movies
                </li>
                <li
                  className="cursor-pointer"
                  onClick={() => handleCategory("Series")}
                >
                  Series
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-2 md:hidden">
              <div>Home</div>
              <div>
                <Menu></Menu>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {!isLogin ? (
        <button
          type="button"
          onClick={() => {
            handleSignInSignOut();
          }}
          className="rounded border-2 border-red-600 bg-red-600 px-3 py-1 text-white"
        >
          {buttonLoading ? (
            <Loading />
          ) : (
            <>{IS_LOGGED_IN ? "Sign out" : "Sign In"}</>
          )}
        </button>
      ) : (
        <div className="flex h-fit items-center gap-3">
          <IconContext.Provider value={{ size: "25px" }}>
            <div className="flex border-2 border-white  text-white">
              <div className="cursor-pointer" onClick={handleSearch}>
                <SearchIcon />
              </div>

              <form onSubmit={handleSearch}>
                <input
                  className="h-full w-full bg-black/50 text-white transition ease-in-out focus:outline-none"
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                ></input>
              </form>
            </div>
          </IconContext.Provider>
          <div className="flex items-center gap-2">
            <div className="w-10 overflow-hidden rounded">
              <img
                src={netflixAvatar}
                className="object-contain"
                alt="avatar"
              />
            </div>

            <Menu>
              <ul className="rounded bg-netflix-black p-4">
                <li className="flex items-center gap-4">
                  <div className="w-8 overflow-hidden rounded">
                    <img
                      src={netflixAvatar}
                      className="object-contain"
                      alt="menu"
                    />
                  </div>

                  <div>{user.name}</div>
                </li>
                <hr className="my-4" />
                <li
                  className="flex cursor-pointer items-center gap-4"
                  onClick={() => handleSignInSignOut()}
                >
                  <IconContext.Provider value={{ size: "25px" }}>
                    <FaSignOutAlt /> Sign out of Netflix
                  </IconContext.Provider>
                </li>
              </ul>
            </Menu>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
