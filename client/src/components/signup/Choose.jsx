import React from "react";
import { Check } from "../icons.jsx";
import checkMark from "../../assets/Checkmark.png";
import { Link } from "react-router-dom";
function Choose() {
  return (
    <div className="   max-w-[450px]m-4">
      <div className="  w-80">
        <img className="mx-auto  w-12 mb-6" src={checkMark} alt="checkmark" />
        <p className="text-[#333] text-center">
          STEP <span className="font-bold">1</span> OF {""}
          <span className="font-bold">3</span>
        </p>
        <p className="text-[#333] text-3xl  mb-5 font-bold text-center">
          Choose your plan.
        </p>
        <ul>
          <li className="text-xl text-[#333]   font-semibold mb-2 flex gap-2">
            <Check /> No commitments, cancel anytime.{" "}
          </li>
          <li className="text-xl text-[#333] mb-2 flex gap-2 font-semibold">
            <Check /> Everything on Netflix for one low price.
          </li>
          <li className="text-xl text-[#333] mb-2 flex gap-2 font-semibold">
            <Check /> No ads and no extra fees. Ever.
          </li>
        </ul>
      </div>
      <Link to="/singup/planform">
        <button className="mt-6 bg-[#e50914]  rounded-md  h-16 w-full hover:bg-[#f6121d] text-white font-semibold  text-xl">
          Next
        </button>
      </Link>
    </div>
  );
}

export default Choose;
