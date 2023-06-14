import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// icon
import { CrossFillIcon, Loading } from "../icons.jsx";
// thunk
import { RESET_PASSWORD } from "../../store/authSlice.js";

function ResetPassword() {
  const dispatch = useDispatch();
  const [error, setError] = useState({ error: false, message: "" });
  const { resetPasswordToken } = useParams();
  const resetPasswordLoading = useSelector(
    (state) => state.auth.resetPasswordLoading
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await dispatch(
      RESET_PASSWORD({ resetPasswordToken, formData })
    );
    if (response.payload.success) {
    } else {
      setError({ error: true, message: response.payload.message });
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className=" md:w-[1020px] mx-4 p-10 shadow-xl flex flex-col  gap-3"
    >
      <h2 className="font-bold">Change your password</h2>
      {error.error ? (
        <div className="bg-[#ffa00a] h-12  w-fit  mt-4 flex items-center px-3 ">
          <div
            onClick={() => setError({ error: false, message: "" })}
            className="cursor-pointer"
          >
            <CrossFillIcon />
          </div>
          <p className="  mx-6 font-bold text-white">{error.message}</p>
        </div>
      ) : null}
      <p className="my-2  text-lg text-[#333333]">
        Protect your account with a unique password at least 6 characters long.
      </p>
      {/* current email */}
      <div className="relative z-0 md:max-w-xl mb-4 group border-[1px] border-gray ">
        <input
          type="email"
          name="currentEmail"
          id="currentEmail"
          className="m-3 block py-2.5 px-0 w-full text-sm  font-semibold text-gray-900 bg-transparent border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
          placeholder=" "
        />
        <label
          htmlFor="currentEmail"
          className="m-3  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-500  peer-focus:font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Current email
        </label>
      </div>
      {/* current email end */}

      {/* new password */}
      <div className="relative z-0 md:max-w-xl mb-4 group border-[1px] border-gray ">
        <input
          type="password"
          name="password"
          id="password"
          className="m-3 block py-2.5 px-0 w-full text-sm  font-semibold text-gray-900 bg-transparent border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
          required
          minLength={6}
          maxLength={60}
          placeholder=" "
        />
        <label
          htmlFor="floating_password"
          className="m-3  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-500  peer-focus:font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          New password (6-60 characters)
        </label>
      </div>
      {/* new password end*/}

      {/* conform password */}
      <div className="relative z-0 md:max-w-xl mb-4 group border-[1px] border-gray ">
        <input
          type="password"
          name="conformPassword"
          id="conformPassword"
          className="m-3 block py-2.5 px-0 w-full text-sm  font-semibold text-gray-900 bg-transparent border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 peer"
          required
          placeholder=" "
          minLength={6}
          maxLength={60}
        />
        <label
          htmlFor="conformPassword"
          className="m-3  absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-500  peer-focus:font-semibold  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Re-enter new password
        </label>
      </div>
      {/* conform password end */}
      <div>
        <button
          type="submit"
          className="hover:bg-[#2490fd] bg-[#007efa]  min-w-[110px] h-12 my-4  px-4 font-bold  text-lg text-white"
        >
          {resetPasswordLoading ? <Loading /> : "Email Me"}
        </button>
      </div>
    </form>
  );
}

export default ResetPassword;