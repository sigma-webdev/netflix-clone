import netflixLogo from "./../../assets/netflix_logo.png";

const Header = () => {
  return (
    <header className="flex justify-between h-28">
      <div>
        <img src={netflixLogo} alt="netflix logo" className="w-36" />
      </div>
      <div className="flex gap-x-2">
        <div className="flex items-center h-fit bg-black text-white border-2 border-white rounded px-3 py-1">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>

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
