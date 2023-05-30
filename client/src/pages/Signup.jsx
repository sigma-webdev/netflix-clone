import React from "react";
import netflixLogo from "../assets/netflix_logo.png";
import { Link } from "react-router-dom";
//components
import Step1_2 from "../components/signUp/Step1_2.jsx";
import ChoosePlan from "../components/signUp/ChoosePlan.jsx";
import RegForm from "../components/signUp/RegForm.jsx";
import SignIn from "../components/signUp/SignIn.jsx";
import Choose from "../components/signUp/Choose.jsx";
import PlanForm from "../components/signUp/PlanForm";

const Signup = () => {
  return (
    <div>
      {/* nav bar */}
      <nav className="flex justify-between items-center px-3 md:px-10 h-16 md:h-24 border-b-[1px] border-gray">
        <Link to="/">
          <img class="h-8  md:h-12" src={netflixLogo} alt="netflix logo" />
        </Link>
        <h2 class="font-bold  text-[#333] text-lg border-white  border-b-[3px] hover:border-black cursor-pointer ">
          Sign In
        </h2>
      </nav>

      <div className="flex justify-center  items-center h-[90vh]">
        <ChoosePlan />
        {/* <RegForm /> */}
        {/* <SignIn /> */}
        {/* <Choose /> */}
        {/* <PlanForm /> */}
      </div>

      <footer class="bg-[#f3f3f3] p-8">
        <p className="text-[#848484] text-lg">Questions?</p>
        <ul className="text-[#848484] flex justify-evenly">
          <li>FAQ</li>
          <li>Help center</li>
          <li>Netflix Shop</li>
          <li>Terms of Use</li>
          <li>Privacy</li>
          <li> Cookie preference</li>
          <li></li>
        </ul>
      </footer>
    </div>
  );
};

export default Signup;
