import React from "react";
import Step1_1 from "../components/signup/Step1_1";
import Step1_2 from "../components/signup/Step1_2";
import { Route, Routes } from "react-router-dom";

const Signup = () => {
  return ( 
    <div className="flex justify-center">
      {/* <Routes>
        <Route extact path="/" element={<Step1_1 />} />
        <Route extact path="/signup/01_2" element={<Step1_2 /> } />
      </Routes> */}
    </div>
  );
};

export default Signup;
