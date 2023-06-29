import React from "react";
import SignUpHeader from "../../components/signup/SignUpHeader";
import SignUpFooter from "../../components/signup/SignUpFooter";

const SignUpLayout = ({ children }) => {
  return (
    <>
      <SignUpHeader />
      {children}
      <SignUpFooter />
    </>
  );
};

export default SignUpLayout;
