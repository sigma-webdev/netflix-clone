import GlobeIcon from "../icon/GlobeIcon";
import netflixLogo from "./../../assets/netflix_logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between h-16">
      <div>
        <Link to="/">
          <img src={netflixLogo} alt="netflix logo" className="w-36" />
        </Link>
      </div>
      <div className="flex gap-x-2">
        <div className="flex items-center h-fit bg-black text-white border-2 border-white rounded px-3 py-1">
          <GlobeIcon />
          <select
            className=" bg-transparent rounded  "
            defaultValue={"English"}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="align-middle text-lg px-4 py-1 bg-red-600 rounded text-white "
          >
            <Link to="/signin">Sign In</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
