import netflixLogo from "./../../assets/netflix_logo.png";
import { IconContext } from "react-icons/lib";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
// icons
import { GlobeIcon } from "../icons";
import { AiOutlineSearch } from "react-icons/ai";
import { BiBell, BiDownArrow } from "react-icons/bi";
// THUNK
import { SIGN_OUT } from "../../store/authSlice.js";

const Header = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const IS_LOGGED_IN = useSelector((state) => state.auth.isLoggedIn);
  const getUserLoading = useSelector((state) => state.auth.getUserLoading);
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
  }, []);

  async function handleSignInSignOut() {
    if (!IS_LOGGED_IN) return navigate("/signin");
    const response = await dispatch(SIGN_OUT());
    if (response.payload.success) {
      navigate("/signoutpage");
    }
  }

  return (
    <header
      ref={headerRef}
      className={`max-w-[1400px] flex items-center justify-between w-full h-24 px-8 text-white  z-20 transition ease-in-out duration-300 ${
        isLogin ? "fixed top-0" : "absolute"
      }`}
    >
      <div className="flex gap-4">
        <div className={isLogin ? "w-24" : "w-32"}>
          <Link to="/">
            <img src={netflixLogo} alt="netflix logo" className="w-full" />
          </Link>
        </div>
        {/* login  */}
        {isLogin ? (
          <div className="flex items-center">
            <nav>
              <ul className="hidden lg:flex gap-4 ">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/">TV Shows</a>
                </li>
                <li>
                  <a href="/">Movies</a>
                </li>
                <li>
                  <a href="/">New & Popular</a>
                </li>
                <li>
                  <a href="/">My List</a>
                </li>
                <li>
                  <a href="/">Browse By Languages</a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-2 lg:hidden">
              <div>Home</div>
              <div>
                <div>
                  <Link to="/">
                    <BiDownArrow />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {!isLogin ? (
        <div className="flex gap-x-2">
          <div className="flex items-center h-fit bg-black text-white border-2 border-white rounded px-3 py-1">
            <GlobeIcon />
            <select className="bg-transparent rounded" defaultValue={"English"}>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                handleSignInSignOut();
              }}
              className="px-3 py-1 bg-red-600 rounded text-white border-2 border-red-600"
            >
              {IS_LOGGED_IN ? "Sign out" : "Sign In"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-fit items-center gap-2">
          <IconContext.Provider value={{ size: "25px" }}>
            <div className="hidden md:block">
              <AiOutlineSearch />
            </div>
            <div>
              <BiBell />
            </div>
          </IconContext.Provider>
          <div className="flex items-center gap-2">
            <div>{user.name}</div>
            <div>
              <BiDownArrow />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
