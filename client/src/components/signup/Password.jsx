import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
// icons
import { Loading } from "../icons.jsx";

function Password() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const SIGN_IN_LOADING = useSelector((state) => state.auth.signInLoading);

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
      userData.success &&
      userData.data.subscription.status !== "active"
    ) {
      navigate("/signup/choose");
    } else if (!userData.success) return;
  }

  return (
    <form className="   max-w-[440px]  m-4" onSubmit={(e) => handleSignIn(e)}>
      <p className="text-[#333]">
        STEP <span className="font-bold">1</span> OF {""}
        <span className="font-bold">3</span>
      </p>
      <p className="text-[#333] text-3xl  mb-3 font-bold">Welcome back!</p>
      <p className="text-[#333] text-3xl  mb-3 font-bold">
        Joining Netflix is easy.
      </p>
      <p className="text-xl text-[#333]  mb-4">
        Enter your password and you'll be watching in no time.
      </p>

      <p className="text-base text-[#333]  ">Email</p>
      <p className="text-base text-[#333] font-bold mb-4">{email}</p>

      {/* password */}
      <div className="relative z-0 w-full mb-4 group border-[1px] border-gray ">
        <input
          type="password"
          name="password"
          id="floating_password"
          className="m-3 block py-2.5 px-0 w-full text-sm  font-semibold text-gray-900 bg-transparent border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
          required
          placeholder=" "
        />
        <label
          htmlFor="floating_password"
          className="m-3  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-500  peer-focus:font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter a password
        </label>
      </div>
      <Link to="/forgotpassword">
        <p className="  text-blue-600  border-b-2  border-white  hover:border-blue-600 w-fit">
          Forgot your password?
        </p>
      </Link>
      {/* password */}
      <button
        type="submit"
        className="mt-3 bg-[#e50914]  rounded-md  h-16 w-full hover:bg-[#f6121d] text-white font-semibold  text-xl"
      >
        {SIGN_IN_LOADING ? <Loading /> : "Next"}
      </button>
    </form>
  );
}

export default Password;
