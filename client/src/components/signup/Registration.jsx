import React from "react";
import Devices from "../../assets/Devices.png";
import { Link } from "react-router-dom";

function Registration() {
  return (
    <div className="w-80 text-center mx-4">
      <img className=" h-18 my-6" src={Devices} alt="devices" />
      <p className="text-[#333]">
        STEP <span className="font-bold">1</span> OF {""}
        <span className="font-bold">3</span>
      </p>
      <p className="text-[#333] text-3xl  mb-3 font-bold">
        Finish setting up your account
      </p>
      <p className="text-xl text-[#333]">
        Netflix is personalised for you. Create a password to watch on any
        device at any time.
      </p>
      <Link to="/signup/regform">
        <button className=" mt-6 bg-[#e50914]  rounded-md  h-16 w-full hover:bg-[#f6121d] text-white font-semibold  text-xl">
          Next
        </button>
      </Link>
    </div>
  );
}

export default Registration;
