import netflixLogo from "./../../assets/netflix_logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { BiBell, BiDownArrow } from "react-icons/bi";
import { IconContext } from "react-icons/lib";

const BrowseHeader = () => {
  return (
    <header className="flex justify-between items-center h-32 px-8">
      <div className="flex h-fit gap-4 items-center">
        <div className="w-24">
          <img src={netflixLogo} alt="netflix logo" className="w-full" />
        </div>
        <nav>
          <ul className="hidden lg:flex gap-4 items-center h-full">
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
        <div className="flex items-center gap-2 md:hidden">
          <div>Home</div>
          <div>
            <div>
              <BiDownArrow />
            </div>
          </div>
        </div>
      </div>

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
    </header>
  );
};

export default BrowseHeader;
