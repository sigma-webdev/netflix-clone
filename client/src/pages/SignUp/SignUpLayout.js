import React from "react";
import SignUpHeader from "../../components/signUp/SignUpHeader";
import SignUpFooter from "../../components/signUp/SignUpFooter";

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
