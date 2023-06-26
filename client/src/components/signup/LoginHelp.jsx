import React from "react";
import { useParams } from "react-router-dom";
function LoginHelp() {
  const { email } = useParams();
  return (
    <div className=" w-[460px] p-10 shadow-xl flex flex-col bg-[#f3f3f3]">
      <h2>Email Sent</h2>
      <p className="my-10   text-lg">
        An email with instructions on how to reset your password has been sent
        to <b>{email}</b>. Check your spam or junk folder if you don’t see the
        email in your inbox.
      </p>
    </div>
  );
}

export default LoginHelp;
