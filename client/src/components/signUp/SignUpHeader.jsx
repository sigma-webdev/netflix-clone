import React from "react";

import { Link } from "react-router-dom";
import netflixLogo from "../../assets/logos/netflix_logo.png";

const SignUpHeader = () => {
  return (
    <>
      {" "}
      {/* nav bar */}
      <nav className="flex items-center justify-between border border-b-gray-200 px-10 py-5">
        <Link to="/">
          <img className="h-8 md:h-12" src={netflixLogo} alt="netflix logo" />
        </Link>
      </nav>
    </>
  );
};

export default SignUpHeader;
