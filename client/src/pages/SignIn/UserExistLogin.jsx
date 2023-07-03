import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import SignUpLayout from "../SignUp/SignUpLayout";

const UserExistLogin=()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = localStorage.getItem("netflixCloneEmail");
  const SIGN_IN_LOADING = useSelector((state) => state.auth.loading);

  async function handleSignIn(e) {
    e.preventDefault();

    // adding all the input in form
    const formData = new FormData(e.target);
    formData.append("email", email);

    // call the redux thunk SIGN_IN by passing form Data
    const response = await dispatch(SIGN_IN(formData));
    const userData = response.payload;

    //if user is logged-in  check the subscription status is active or not,
    //if active redirect to browser page
    // if not active redirect to subscription plane choose page
    // finally if there is any error or user send wrong credentials for sign-in show error message
    //  from extra reducers rejected state
    if (userData.success && userData.data.subscription.status === "active") {
      navigate("/browse");
    } else if (
      userData?.success &&
      userData?.data?.subscription?.status !== "active"
    ) {
      navigate("/signup/checkplan");
    } else if (!userData.success) return;
  }

  return (
      <SignUpLayout>
          <div className="w-full flex items-center justify-center">
              <form className="my-20 max-w-[440px] shadow-gray-200 shadow-lg p-3" onSubmit={(e) => handleSignIn(e)}>
      <p className="text-[#333]">
        STEP <span className="font-bold">1</span> OF {""}
        <span className="font-bold">3</span>
      </p>
      <p className="mb-3 text-3xl  font-bold text-[#333]">Welcome back!</p>
      <p className="mb-3 text-3xl  font-bold text-[#333]">
        Joining Netflix is easy.
      </p>
      <p className="mb-4 text-xl  text-[#333]">
        Enter your password and you'll be watching in no time.
      </p>

      <p className="text-base text-[#333]  ">Email</p>
      <p className="mb-4 text-base font-bold text-[#333]">{email}</p>

      {/* password */}
      <div className="border-gray group relative z-0 mb-4 w-full border-[1px] ">
        <input
          type="password"
          name="password"
          id="floating_password"
          className="peer m-3 block w-full appearance-none border-gray-300  bg-transparent px-0 py-2.5 text-sm font-semibold text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-0"
          required
          placeholder=" "
        />
        <label
          htmlFor="floating_password"
          className="absolute  top-3 -z-10 m-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:left-0  peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-gray-500"
        >
          Enter a password
        </label>
      </div>
      <Link to="/password/forget">
        <p className="  w-fit  border-b-2  border-white  text-blue-600 hover:border-blue-600">
          Forgot your password?
        </p>
      </Link>
      {/* password */}
      <button
        type="submit"
        className="mt-3 h-16 w-full flex items-center justify-center rounded-md bg-[#e50914] text-xl font-semibold text-white  hover:bg-[#f6121d]"
      >
        {SIGN_IN_LOADING ? <AiOutlineLoading /> : "Next"}
      </button>
    </form></div>
   </SignUpLayout>
  );
}

export default UserExistLogin;
