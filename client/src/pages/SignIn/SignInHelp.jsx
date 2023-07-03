import React from "react";
import { useParams } from "react-router-dom";
import SignUpLayout from "../SignUp/SignUpLayout";

const SignInHelp=()=> {
  const { email } = useParams();
  return (
      <SignUpLayout>
          {/* container for the card */}
          <div className="flex items-center justify-center my-20">
               <div className=" flex w-[460px] flex-col bg-[#f3f3f3] p-10 shadow-xl">
      <h2>Email Sent</h2>
      <p className="my-10 text-lg">
        An email with instructions on how to reset your password has been sent
        to <b>{email}</b>. Check your spam or junk folder if you don’t see the
        email in your inbox.
      </p>
    </div>
          </div>
   </SignUpLayout>
  );
}

export default SignInHelp;
