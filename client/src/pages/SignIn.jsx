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
  const signInLoading = useSelector((state) => state.auth.loading);

  async function handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await dispatch(SIGN_IN(formData));
    if (!response?.payload?.success) {
      return setSignInError({
        error: true,
        message: response.payload.message,
      });
    }
    return navigate("/");
  }

  return (
    <Layout bgcolor="bg-[#00081D]" padding="py-20">
      <div className="flex h-screen w-full items-center justify-center bg-netflix-home bg-cover bg-no-repeat">
        <div className="h-fit rounded-lg bg-black bg-opacity-90 px-16 py-12 my-60">
          <div className="text-3xl text-white">Sign In</div>
          {signInError.error ? (
            <div className="mt-4 max-w-[300px] rounded-lg bg-[#e87c03] p-3">
              <p className="text-white">{signInError.message}</p>
            </div>
          ) : null}

          <form
            className="mb-24 flex flex-col"
            onSubmit={(e) => handleSignIn(e)}
          >
            <div className="group relative z-0 my-6 w-full ">
              <input
                type="email"
                name="email"
                id="floating_email"
                className="peer block w-[300px] appearance-none rounded bg-[#333333] px-4 pb-2 pt-4 text-white focus:outline-none focus:ring-0 dark:text-white"
                required
                placeholder=""
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:text-small absolute top-5 z-10 origin-[0] -translate-y-6 scale-75 transform px-4 text-sm text-[#717171] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:left-0 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-gray-400"
              >
                Email
              </label>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <input
                type="password"
                name="password"
                id="floating_password"
                className="peer block w-[300px] appearance-none rounded bg-[#333333] px-4 pb-2  pt-4 text-white focus:outline-none focus:ring-0 dark:text-white"
                required
                placeholder=" "
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:text-small absolute top-4 z-10 origin-[0] -translate-y-6 scale-75 transform px-4 text-sm text-[#717171] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:left-0 peer-focus:-translate-y-4 peer-focus:scale-75 dark:text-gray-400"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-[300px] rounded bg-[#e50914] py-2 text-white"
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
