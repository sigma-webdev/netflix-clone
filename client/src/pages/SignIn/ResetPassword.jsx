import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET_PASSWORD } from "../../store/authSlice.js";
import SignUpLayout from "../SignUp/SignUpLayout.jsx";
import { RxCross2 } from "react-icons/rx";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({ error: false, message: "" });
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await dispatch(RESET_PASSWORD({ token, formData }));
    if (response.payload.success) {
      navigate("/signin");
    } else {
      setError({ error: true, message: response.payload.message });
    }
  };

  return (
    <SignUpLayout>
      {/* card container */}
      <div className="my-20 flex items-center justify-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mx-4 flex w-fit flex-col gap-3 p-10 shadow-xl"
        >
          <h2 className="font-bold">Change your password</h2>
          {error.error ? (
            <div className="mt-4 flex  h-12  w-fit items-center bg-[#ffa00a] px-3 ">
              <div
                onClick={() => setError({ error: false, message: "" })}
                className="cursor-pointer"
              >
                <RxCross2 />
              </div>
              <p className="mx-6 font-bold text-white ">{error.message}</p>
            </div>
          ) : null}
          <p className="my-2  text-lg text-[#333333]">
            Protect your account with a unique password at least 6 characters
            long.
          </p>
          {/* new password */}
          <div className="border-gray group relative z-0 mb-4 border-[1px] md:max-w-xl ">
            <input
              type="password"
              name="password"
              id="password"
              className="peer m-3 block w-full appearance-none border-gray-300  bg-transparent px-0 py-2.5 text-sm font-semibold text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-0"
              required
              minLength={6}
              maxLength={60}
              placeholder=" "
            />
            <label
              htmlFor="floating_password"
              className="absolute  top-3 -z-10 m-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:left-0  peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-gray-500"
            >
              New password (6-60 characters)
            </label>
          </div>
          {/* new password end*/}

          {/* conform password */}
          <div className="border-gray group relative z-0 mb-4 border-[1px] md:max-w-xl ">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="peer m-3 block w-full appearance-none border-gray-300  bg-transparent px-0 py-2.5 text-sm font-semibold text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-0"
              required
              placeholder=" "
              minLength={6}
              maxLength={60}
            />
            <label
              htmlFor="confirmPassword"
              className="absolute  top-3 -z-10 m-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:left-0  peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-gray-500"
            >
              Re-enter new password
            </label>
          </div>
          {/* conform password end */}
          <div>
            <button
              type="submit"
              className="mx-2 my-4 h-12  min-w-[110px] bg-[#007efa] px-4  text-lg font-bold  text-white hover:bg-[#2490fd]"
            >
              Update
            </button>
            <Link to="/">
              <button
                type="submit"
                className="my-4 h-12  min-w-[110px] bg-gray-200 px-4  text-lg font-semibold  text-gray-500 hover:bg-gray-300"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </SignUpLayout>
  );
};

export default ResetPassword;
