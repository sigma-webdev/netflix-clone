import React from "react";
import logo from "../assets/netflix_logo.png";
import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  return (
    <div className="h-screen w-[100%]">
      {/* creating the header */}
      <header className="flex h-[13vh] items-center bg-black pl-10">
        {/* adding the netflix logo */}
        <img src={logo} alt="logo" className="w-24" />
      </header>

      {/* creating the main section */}
      <main className="flex h-[87vh] flex-col items-center justify-center gap-5 bg-[url('https://assets.nflxext.com/ffe/siteui/pages/errors/bg-lost-in-space.png')] bg-cover bg-no-repeat text-white">
        <h1 className="font-bold">Lost your way?</h1>
        <p className="text-2xl">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <Link to={"/"}>
          <button className="rounded-md bg-white px-6 py-3 font-semibold text-black">
            Netflix Home
          </button>
        </Link>
        <h3 className="border-4 border-b-transparent border-l-red-500 border-r-transparent border-t-transparent py-3 pl-4 text-3xl">
          Error Code <span className="font-bold">{error?.status}</span>
        </h3>
      </main>
    </div>
  );
};

export default NotFound;
