import React from "react";
import { Check } from "../icons.jsx";
import checkMark from "../../assets/Checkmark.png";
import { Link } from "react-router-dom";
function Choose() {
  return (
    <div className="   max-w-[450px]m-4">
      <div className="  w-80">
        <img className="mx-auto  mb-6 w-12" src={checkMark} alt="checkmark" />
        <p className="text-center text-[#333]">
          STEP <span className="font-bold">1</span> OF {""}
          <span className="font-bold">3</span>
        </p>
        <p className="mb-5 text-center  text-3xl font-bold text-[#333]">
          Choose your plan.
        </p>
        <ul>
          <li className="mb-2 flex   gap-2 text-xl font-semibold text-[#333]">
            <Check /> No commitments, cancel anytime.{" "}
          </li>
          <li className="mb-2 flex gap-2 text-xl font-semibold text-[#333]">
            <Check /> Everything on Netflix for one low price.
          </li>
          <li className="mb-2 flex gap-2 text-xl font-semibold text-[#333]">
            <Check /> No ads and no extra fees. Ever.
          </li>
        </ul>
      </div>
      <Link to="/signup/planform">
        <button className="mt-6 h-16  w-full  rounded-md bg-[#e50914] text-xl font-semibold text-white  hover:bg-[#f6121d]">
          Next
        </button>
      </Link>
    </div>
  );
}

export default Choose;
