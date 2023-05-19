import React from "react";
// import Layout from "../components/layout/Layout";

//components
import Step1_2 from "../components/signup/Step1_2.jsx";

const Signup = () => {
  
  return (
    <div className="flex justify-center">
      <Step1_2 />
      {/* <Route extact path="/" element={<Step1_1 />} /> */}
      {/* <Route extact path="/signup/01_2" element={<Step1_2 />} /> */}
    </div>
  );

};

export default Signup;
