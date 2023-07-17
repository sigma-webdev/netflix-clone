import { Link, useNavigate } from "react-router-dom";
import { SIGN_OUT } from "../../../store/authSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { fetchContentBySearch } from "../../../store/contentSlice";
import netflixLogo from "../../../assets/logos/netflix_logo.png";
import netflixAvatar from "../../../assets/icons/netflix-avtar.jpg";
import Menu from "../../menu/Menu";

const BrowseHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const headerRef = useRef(null);
  const user = useSelector((state) => state?.auth?.userData);
  const IS_LOGGED_IN = useSelector((state) => state?.auth?.isLoggedIn);

  const scrollHandler = () => {
    if (window.scrollY > 10) {
      headerRef.current.style.backgroundColor = "black";
    } else {
      headerRef.current.style.backgroundColor = "transparent";
    }
  };

  useEffect(() => {
    if (IS_LOGGED_IN) {
      window.addEventListener("scroll", scrollHandler);
    }

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    dispatch(fetchContentBySearch({ searchText, userId: user._id }));
  }, []);

  const handleSignInSignOut = async () => {
    if (!IS_LOGGED_IN) return navigate("/signin");
    const response = await dispatch(SIGN_OUT());
    if (response?.payload?.success) {
      navigate("/logout");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchContentBySearch({ searchText, userId: user._id }));
  };

  return (
    <header
      className="fixed top-0 z-50 flex h-16 w-full items-center justify-between px-4 text-white transition duration-300 ease-in-out md:h-20 md:px-8"
      ref={headerRef}
    >
      <div className="md:text-md flex gap-4 text-sm">
        <div className="w-16 md:w-24">
          <Link to="/">
            <img src={netflixLogo} alt="netflix logo" className="w-full" />
          </Link>
        </div>
      </div>

      <div className="flex h-fit items-center gap-3">
        <div className="flex border-2 border-white  text-white">
          <div
            className="flex cursor-pointer items-center gap-2 bg-black/50  px-1 py-1 text-white"
            onClick={handleSearch}
          >
            <AiOutlineSearch className="text-2xl" />
          </div>

          <form onSubmit={handleSearch}>
            <input
              className="h-full w-full bg-black/50 text-white transition ease-in-out focus:outline-none"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            ></input>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 overflow-hidden rounded">
            <img src={netflixAvatar} className="object-contain" alt="avatar" />
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

                <div>Mangesh Thakare</div>
              </li>
              <hr className="my-4" />
              {IS_LOGGED_IN && user?.role === "ADMIN" && (
                <Link to={"/admin"}>
                  <li className="flex cursor-pointer items-center gap-4">
                    <RiAdminFill className="text-2xl" />
                    Admin Dashboard
                  </li>
                </Link>
              )}
              <hr className="my-4" />
              <li
                className="flex cursor-pointer items-center gap-4"
                onClick={() => handleSignInSignOut()}
              >
                <FaSignOutAlt className="text-2xl" /> Sign out of Netflix
              </li>
            </ul>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default BrowseHeader;
