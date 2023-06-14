import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//components
import Layout from "../components/layout/Layout";
// packages
import { Link, useNavigate } from "react-router-dom";
// thunk
import { SIGN_IN } from "../store/authSlice.js";
// svg / icon
import { Loading } from "../components/icons.jsx";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInError, setSignInError] = useState({ error: false, message: "" });
  const signInLoading = useSelector((state) => state.auth.signInLoading);

  async function handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await dispatch(SIGN_IN(formData));
    if (!response.payload.success) {
      return setSignInError({
        error: true,
        message: response.payload.message
      });
    }
    return navigate("/");
  }

  return (
    <Layout bgcolor="bg-[#00081D]" padding="p-12">
      <div className="flex  justify-center items-center bg-netflix-home h-screen bg-no-repeat bg-cover w-full">
        <div className="py-12 px-16 bg-black bg-opacity-90 h-fit rounded-lg">
          <div className="text-white text-3xl">Sign In</div>
          {signInError.error ? (
            <div className="bg-[#e87c03] p-3 max-w-[300px] rounded-lg mt-4">
              <p className="text-white">{signInError.message}</p>
            </div>
          ) : null}

          <form
            className="flex flex-col mb-24"
            onSubmit={(e) => handleSignIn(e)}
          >
            <div className="relative z-0 w-full my-6 group ">
              <input
                type="email"
                name="email"
                id="floating_email"
                className="block pt-4 pb-2 w-[300px] px-4 rounded bg-[#333333] text-white appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                required
                placeholder=" "
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:text-small absolute text-sm px-4 z-10 text-[#717171] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-5 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Email or phone number
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="password"
                id="floating_password"
                className="block pt-4 pb-2 w-[300px] px-4 rounded bg-[#333333] text-white  appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                required
                placeholder=" "
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:text-small absolute text-sm px-4 z-10 text-[#717171] dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-[300px] py-2 rounded text-white bg-[#e50914]"
            >
              {signInLoading ? <Loading /> : "Sign In"}
            </button>
          </form>

          <div className="mb-2">
            <span className="text-gray-400">New to Netflix? </span>
            <Link className="text-white" to="/">
              Sign up now
            </Link>
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

export default SignIn;
