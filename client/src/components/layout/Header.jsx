import GlobeIcon from "../icon/GlobeIcon";
import netflixLogo from "./../../assets/netflix_logo.png";

const Header = () => {
  return (
    <header className="flex justify-between h-16">
      <div>
        <img src={netflixLogo} alt="netflix logo" className="w-36" />
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
            <a href="/login">Sign In</a>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
