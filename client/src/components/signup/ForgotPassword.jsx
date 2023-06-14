import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
    const formData = new FormData(e.target);
    const response = await dispatch(FORGOT_PASSWORD(formData));
    console.log(response);
    if (response.payload.success) {
      navigate("/loginhelp");
    } else {
      setError({ error: true, message: response.payload.message });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className=" w-[460px] p-10 shadow-xl flex flex-col bg-[#f3f3f3]"
    >
      <h2 className="font-semibold mb-10">Forgot Email/Password</h2>
      {error.error ? (
        <div className="bg-[#ffa00a] h-12 w-full">
          <CrossFillIcon /> <p>{error.message}</p>
        </div>
      ) : null}

      <p className="my-5   text-lg">
        we will send you an email with instruction on how to reset you password.
      </p>
      <input
        className=" h-12 my-4 border-2 p-2 focus:outline-none"
        type="text"
        name="email"
        placeholder="name@example.com"
      />

      <button
        type="submit"
        className="hover:bg-[#2490fd] bg-[#007efa]  h-12 my-4   text-lg text-white"
      >
        {FORGOT_PASSWORD_LOADING ? <Loading /> : "Email Me"}
      </button>
    </form>
  );
}

export default ForgotPassword;
