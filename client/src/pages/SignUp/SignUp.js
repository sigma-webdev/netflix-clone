import React from "react";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import SignUpLayout from "./SignUpLayout";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <SignUpLayout>
        <div className="w-96 m-auto my-40">
          <div className="space-y-3">
            <div className="w-fit m-auto text-red-500">
              <AiOutlineCheckCircle size={"50px"} />
            </div>
            <p className="text-[#333] text-center">
              STEP <span className="font-bold">1</span> OF {""}
              <span className="font-bold">3</span>
            </p>
            <p className="text-[#333] text-3xl  mb-5 font-bold text-center">
              Choose your plan.
            </p>
            <ul>
              <li className="text-xl text-[#333]   font-semibold mb-2 flex gap-2">
                <AiOutlineCheck className="text-red-500" size={"30px"} /> No
                commitments, cancel anytime.{" "}
              </li>
              <li className="text-xl text-[#333] mb-2 flex gap-2 font-semibold">
                <AiOutlineCheck className="text-red-500" size={"30px"} />{" "}
                Everything on Netflix for one low price.
              </li>
              <li className="text-xl text-[#333] mb-2 flex gap-2 font-semibold">
                <AiOutlineCheck className="text-red-500" size={"30px"} /> No ads
                and no extra fees. Ever.
              </li>
            </ul>
          </div>
          <Link to="/signup/planform">
            <button className="mt-6 bg-[#e50914]  rounded-md  h-16 w-full hover:bg-[#f6121d] text-white font-semibold  text-xl">
              Next
            </button>
          </Link>
        </div>
      </SignUpLayout>
    </div>
  );
};

export default SignUp;
