import { BiDownArrow } from "react-icons/bi";
import GlobeIcon from "../icon/GlobeIcon";
import netflixLogo from "./../../assets/netflix_logo.png";

const Header = ({ isLogin }) => {
  return (
    <header className="flex items-center justify-between h-32 px-8 text-white bg-netflix-blue">
      <div className="flex gap-4">
        <div className={isLogin ? "w-24" : "w-32"}>
          <img src={netflixLogo} alt="netflix logo" className="w-full" />
        </div>
        {isLogin && (
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
                  <BiDownArrow />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isLogin && (
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
              <a href="/login">Sign In</a>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
