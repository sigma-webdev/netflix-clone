import React from "react";
import Layout from "../components/layout/Layout";

const Login = () => {
  return (
    <Layout bgcolor="bg-[#00081D]" padding="p-12">
      <div className="flex  justify-center items-center bg-netflix-home h-screen bg-no-repeat bg-cover w-full">
        <div className="py-12 px-16 bg-black bg-opacity-80 h-fit">
          <div className="text-white text-3xl">Sign In</div>
          <form className="flex flex-col">
            <div class="relative z-0 w-full my-6 group ">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                class="block py-3 w-[300px] px-4 rounded bg-[#333333] text-white pt-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                class="peer-focus:font-medium absolute text-sm px-4 z-10 text-[#717171] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Email or phone number
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                class="block py-3 w-[300px] px-4 rounded bg-[#333333] text-white pt-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                class="peer-focus:font-medium absolute text-sm px-4 z-10 text-[#717171] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Password
              </label>
            </div>

            <button className="w-[300px] py-2 rounded text-white bg-[#e50914]">
              Sign In
            </button>
          </form>
          <div className="w-[300px] flex justify-between text-gray-300 mb-28">
            <div>
              <input
                type="checkbox"
                name="remember-checkbox"
                id="remember-checkbox"
              />
              <label htmlFor="remember-checkbox"> Remember me</label>
            </div>
            <div>need help</div>
          </div>
          <div className="mb-2">
            <span className="text-gray-400">New to Netflix? </span>
            <span className="text-white">Sign up now</span>
          </div>
          <div className="mb-2 w-[320px]">
            <span className="text-gray-400">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
            </span>
            <span className="text-blue-600">Learn more.</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
