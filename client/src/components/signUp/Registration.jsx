import React from "react";
import Devices from "../../assets/Devices.png";
import { Link } from "react-router-dom";

function Registration() {
  return (
    <div className="mx-4 w-80 text-center">
      <img className=" h-18 my-6" src={Devices} alt="devices" />
      <p className="text-[#333]">
        STEP <span className="font-bold">1</span> OF {""}
        <span className="font-bold">3</span>
      </p>
      <p className="mb-3 text-3xl  font-bold text-[#333]">
        Finish setting up your account
      </p>
      <p className="text-xl text-[#333]">
        Netflix is personalised for you. Create a password to watch on any
        device at any time.
      </p>
      <Link to="/signup/regform">
        <button className=" mt-6 h-16  w-full  rounded-md bg-[#e50914] text-xl font-semibold text-white  hover:bg-[#f6121d]">
          Next
        </button>
      </Link>
    </div>
  );
}

export default Registration;
