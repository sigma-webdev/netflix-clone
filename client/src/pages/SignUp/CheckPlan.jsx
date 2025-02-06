import React from "react";
import SignUpLayout from "./SignUpLayout";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const CheckPlan = () => {
  return (
    <SignUpLayout>
      <div className="m-auto my-40 w-96">
        <div className="space-y-3">
          <div className="m-auto w-fit text-red-500">
            <AiOutlineCheckCircle size={"50px"} />
          </div>
          <p className="text-center text-[#333]">
            STEP <span className="font-bold">1</span> OF {""}
            <span className="font-bold">3</span>
          </p>
          <p className="mb-5 text-center  text-3xl font-bold text-[#333]">
            Choose your plan.
          </p>
          <ul>
            <li className="mb-2 flex   gap-2 text-xl font-semibold text-[#333]">
              <AiOutlineCheck className="text-red-500" size={"30px"} /> No
              commitments, cancel anytime.{" "}
            </li>
            <li className="mb-2 flex gap-2 text-xl font-semibold text-[#333]">
              <AiOutlineCheck className="text-red-500" size={"30px"} />{" "}
              Everything on Netflix for one low price.
            </li>
            <li className="mb-2 flex gap-2 text-xl font-semibold text-[#333]">
              <AiOutlineCheck className="text-red-500" size={"30px"} /> No ads
              and no extra fees. Ever.
            </li>
          </ul>
        </div>
        <Link to="/signup/planform">
          <button className="mt-6 h-16  w-full  rounded-md bg-[#e50914] text-xl font-semibold text-white  hover:bg-[#f6121d]">
            Next
          </button>
        </Link>
      </div>
    </SignUpLayout>
  );
};

export default CheckPlan;
