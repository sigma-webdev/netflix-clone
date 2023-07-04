import React from "react";
import SignUpLayout from "./SignUpLayout";
import { Link } from "react-router-dom";
import Devices from "../../assets/Devices.png";

const SignUp = () => {
  return (
    <div>
      <SignUpLayout>
        <div className="m-auto my-40 w-80 text-center">
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
          <Link to="/signup/registration">
            <button className=" mt-6 h-16  w-full  rounded-md bg-[#e50914] text-xl font-semibold text-white  hover:bg-[#f6121d]">
              Next
            </button>
          </Link>
        </div>
      </SignUpLayout>
    </div>
  );
};

export default SignUp;
