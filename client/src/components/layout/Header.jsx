import { BiBell, BiDownArrow } from "react-icons/bi";
import { GlobeIcon } from "../icons";
import netflixLogo from "./../../assets/netflix_logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";

const Header = ({ isLogin }) => {
  return (
    <header className="flex items-center justify-between h-32 px-8 text-white bg-netflix-blue">
      <div className="flex gap-4">
        <div className={isLogin ? "w-24" : "w-32"}>
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
              type="submit"
              className="px-3 py-1 bg-red-600 rounded text-white border-2 border-red-600"
            >
              <Link to="/signin">Sign In</Link>
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
            <div>Mangesh Thakare</div>
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
