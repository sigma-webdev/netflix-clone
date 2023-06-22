import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function SignOut() {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = setTimeout(() => navigate("/"), 30000);
    return () => clearTimeout(redirect);
  }, []);
  return (
    <div className=" w-[460px] p-10 shadow-xl flex flex-col bg-[#f3f3f3]">
      <h2 className="mb-5">Leaving So Soon?</h2>
      <p className=" text-lg mb-2">
        Just so you know, you don’t always need to sign out of Netflix. It’s
        only necessary if you’re on a shared or public computer.
      </p>
      <p className=" text-lg mb-2">
        You’ll be redirected to Netflix home page in 30 seconds.
      </p>
      <Link to="/">
        <button className="   w-full text-lg  text-white h-10  font-semibold bg-[#017bf5] hover:bg-[#2490fd]   ">
          Go Now
        </button>
      </Link>
    </div>
  );
}

export default SignOut;
