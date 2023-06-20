import { BiBell, BiDownArrow } from "react-icons/bi";
import { GlobeIcon } from "../icons";
import netflixLogo from "./../../assets/netflix_logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Menu from "../menu/Menu";
import netflixAvatar from "../../assets/netflix-avtar.jpg";
import { FaSignOutAlt } from "react-icons/fa";

const Header = ({ isLogin }) => {
  const user = useSelector((state) => state.user.currentUser);
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

  return (
    <header
      ref={headerRef}
      className={`flex items-center justify-between w-full h-16 md:h-20 px-4 md:px-8 text-white  z-20 transition ease-in-out duration-300 ${
        isLogin ? "fixed top-0" : "absolute"
      }`}
    >
      <div className="flex gap-4 text-sm md:text-md">
        <div className={isLogin ? "w-16 md:w-24" : "w-16 md:w-32"}>
          <img src={netflixLogo} alt="netflix logo" className="w-full" />
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
                <Menu></Menu>
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
              type="submit"
              className="px-3 py-1 bg-red-600 rounded text-white border-2 border-red-600"
            >
              <Link to="/signin">Sign In</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-fit items-center gap-3">
          <IconContext.Provider value={{ size: "25px" }}>
            <div className="hidden md:block">
              <AiOutlineSearch />
            </div>
            <div>
              <BiBell />
            </div>
          </IconContext.Provider>
          <div className="flex items-center gap-2">
            <div className="w-10 rounded overflow-hidden">
              <img src={netflixAvatar} className="object-contain" />
            </div>

            <Menu>
              <ul className="bg-netflix-black p-4 rounded">
                <li className="flex items-center gap-4">
                  <div className="w-8 rounded overflow-hidden">
                    <img src={netflixAvatar} className="object-contain" />
                  </div>

                  <div>{user.name}</div>
                </li>
                <hr className="my-4" />
                <li className="flex items-center gap-4 ">
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
