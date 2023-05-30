import React from "react";

function RegForm() {
  return (
    <div className="   max-w-[440px]  m-4">
      <p className="text-[#333]">
        STEP <span className="font-bold">1</span> OF {""}
        <span className="font-bold">3</span>
      </p>
      <p className="text-[#333] text-3xl  mb-3 font-bold">
        Create a password to start your membership
      </p>
      <p className="text-xl text-[#333]  mb-2">
        Just a few more steps and you're done!
      </p>
      <p className="text-xl text-[#333] mb-2">We hate paperwork, too.</p>
      {/* email */}
      <div class="relative z-0 w-full mb-4 group border-[1px] border-gray ">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          class="m-3 block  py-2.5 px-0 w-full text-sm  font-semibold text-gray-900 bg-transparent   border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-gray-500 peer"
          required
          placeholder=" "
        />
        <label
          for="floating_email"
          class="m-3 peer-focus:font-bold absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      {/* email */}
      {/* password */}
      <div class="relative z-0 w-full mb-4 group border-[1px] border-gray ">
        <input
          type="password"
          name="password"
          id="floating_password"
          class="m-3 block  py-2.5 px-0 w-full text-sm  font-semibold text-gray-900 bg-transparent   border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-gray-500 peer"
          required
          placeholder=" "
        />
        <label
          for="floating_password"
          class="m-3  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-500  peer-focus:font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Add a password
        </label>
      </div>
      {/* password */}
      <button className="mt-3 bg-[#e50914]  rounded-md  h-16 w-full hover:bg-[#f6121d] text-white font-semibold  text-xl">
        Next
      </button>
    </div>
  );
}

export default RegForm;
