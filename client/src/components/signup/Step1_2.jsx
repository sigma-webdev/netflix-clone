import React from "react";
import axios from "axios";

const Step1_2 = () => {
  const URL = process.env.REACT_APP_URL;

  async function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/auth/signup",
        headers: { "content-type": "application/json" },
        withCredentials: true,
        data: formData
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center">
      <div>
        <div>STEP 1 OF 3</div>
        <div className="text-2xl font-bold">
          Welcome back! <br />
          Joining Netflix is easy.
        </div>
        <div>Enter your password and you'll be watching in no time.</div>
        <form onSubmit={(e) => handleSignup(e)}>
          <div className="my-4">
            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              defaultValue="nasikh@ineuron.ai"
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className="block py-3  border border-black  w-[430px] px-4 rounded  text-black pt-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm px-4 z-10 text-[#717171] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Password
            </label>
          </div>
          <div className="text-blue-500 mb-4">Forgot your password?</div>
          <button
            type="submit"
            className="bg-[#E50914] rounded text-white text-xl  w-[430px] text-center py-3"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step1_2;
