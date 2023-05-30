import React from "react";

//components
import Step1_2 from "../components/signUp/Step1_2.jsx";

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
