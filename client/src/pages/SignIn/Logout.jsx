import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SignUpLayout from "../SignUp/SignUpLayout";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = setTimeout(() => navigate("/"), 30000);
    return () => clearTimeout(redirect);
  }, []);

  return (
    <SignUpLayout>
      {/* container div*/}
      <div className="flex items-center justify-center my-20">
        {/* creating the card */}
        <div className="flex w-[460px] flex-col bg-[#f3f3f3] p-10 shadow-xl">
      <h2 className="mb-5">Leaving So Soon?</h2>
      <p className="mb-2 text-lg">
        Just so you know, you don’t always need to sign out of Netflix. It’s
        only necessary if you’re on a shared or public computer.
      </p>
      <p className="mb-2 text-lg">
        You’ll be redirected to Netflix home page in 30 seconds.
      </p>
      <Link to="/">
        <button className="h-10 w-full  bg-[#017bf5] text-lg  font-semibold text-white hover:bg-[#2490fd]   ">
          Go Now
        </button>
      </Link>
    </div>
      </div>
    </SignUpLayout>
  );
}

export default Logout;
