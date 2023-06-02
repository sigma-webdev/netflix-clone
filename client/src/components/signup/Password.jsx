import React from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { SIGN_IN } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = "mangesh@gmail.com";

  async function handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("email", email);
    const response = await dispatch(
      SIGN_IN({ email, password: e.target.password.value })
    );
    const userData = response.payload;
    if (userData.success && userData.data.plan !== "NONE") {
      navigate("/browse");
    } else navigate("/signup/choose");
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
      <Link to="forgotPassword">
        <p className="  text-blue-600  border-b-2  border-white  hover:border-blue-600 w-fit">
          Forgot your password?
        </p>
      </Link>
      {/* password */}
      <button
        type="submit"
        className="mt-3 bg-[#e50914]  rounded-md  h-16 w-full hover:bg-[#f6121d] text-white font-semibold  text-xl"
      >
        Next
      </button>
    </form>
  );
}

export default SignIn;
