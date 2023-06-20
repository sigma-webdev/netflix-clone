import React from "react";

function ResetPassword() {
  return (
    <div className=" w-[460px] p-10 shadow-xl flex flex-col bg-[#f3f3f3]">
      <h2 className="font-semibold">Change your password</h2>
      <p className="my-10   text-lg">
        Protect your account with a unique password at least 6 characters long.
      </p>
      <input
        type="email"
        name="floating_email"
        id="floating_email"
        className="block p-4 my-4 border-2 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <input
        type="email"
        name="floating_email"
        id="floating_email"
        className="block p-4 my-4 w-full border-2 text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />{" "}
      <input
        type="email"
        name="floating_email"
        id="floating_email"
        className="block p-4  my-4 w-full border-2 text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <button className="hover:bg-[#2490fd] bg-[#007efa]  h-12 my-4   text-lg text-white">
        Email Me
      </button>
    </div>
  );
}

export default ResetPassword;
