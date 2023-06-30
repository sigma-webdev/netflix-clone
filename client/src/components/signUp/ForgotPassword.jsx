import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import validator from "email-validator";
import toast from "react-hot-toast";

//thunk
import { FORGOT_PASSWORD } from "../../store/authSlice";
//icons
import { Loading } from "../icons.jsx";
import { CrossFillIcon } from "../icons.jsx";
function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({ error: false, message: "" });
  const FORGOT_PASSWORD_LOADING = useSelector(
    (state) => state.auth.forgotPasswordLoading
  );

  async function handleSubmit(e) {
    e.preventDefault();
    // validating the email
    const isEmailValid = validator.validate(e.target.email.value);
    if (!isEmailValid) return toast.error("please enter valid email 📩");

    const formData = new FormData(e.target);
    const response = await dispatch(FORGOT_PASSWORD(formData));
    console.log(response);
    if (response.payload.success) {
      navigate(`/loginhelp/${e.target.email.value}`);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className=" flex w-[460px] flex-col bg-[#f3f3f3] p-10 shadow-xl"
    >
      <h2 className="mb-10 font-semibold">Forgot Email/Password</h2>

      <p className="my-5   text-lg">
        we will send you an email with instruction on how to reset you password.
      </p>
      <input
        className=" my-4 h-12 border-2 p-2 focus:outline-none"
        type="email"
        name="email"
        placeholder="name@example.com"
        required
      />

      <button
        type="submit"
        className="my-4 h-12  bg-[#007efa] text-lg   text-white hover:bg-[#2490fd]"
      >
        {FORGOT_PASSWORD_LOADING ? <Loading /> : "Email Me"}
      </button>
    </form>
  );
}

export default ForgotPassword;
