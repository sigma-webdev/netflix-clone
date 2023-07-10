import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "email-validator";
import toast from "react-hot-toast";
import { SIGN_UP } from "../../store/authSlice.js";
import { BiLoader } from "react-icons/bi";
import SignUpLayout from "./SignUpLayout.jsx";

const UserRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(localStorage.getItem("netflixCloneEmail"));
  const { loading } = useSelector((state) => state.auth);
  async function handleSubmit(e) {
    e.preventDefault();
    const isEmailValid = validator.validate(e?.target?.email?.value);
    if (!isEmailValid) return toast.error("please enter valid email 📩");
    const formData = new FormData(e.target);
    const response = await dispatch(SIGN_UP(formData));
    if (response.payload.success) {
      navigate("/signup/checkplan");
    }
  }
  return (
    <SignUpLayout>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="   m-auto  my-10 max-w-[440px]"
      >
        <p className="text-[#333]">
          STEP <span className="font-bold">1</span> OF {""}
          <span className="font-bold">3</span>
        </p>
        <p className="mb-3 text-3xl  font-bold text-[#333]">
          Create a password to start your membership
        </p>
        <p className="mb-2 text-xl  text-[#333]">
          Just a few more steps and you're done!
        </p>
        <p className="mb-2 text-xl text-[#333]">We hate paperwork, too.</p>
        {/* email */}
        <div className="border-gray group relative z-0 mb-4 w-full border-[1px] ">
          <input
            // type="email"
            name="email"
            id="floating_email"
            className="peer m-3  block w-full appearance-none border-gray-300  bg-transparent px-0 py-2.5   text-sm font-semibold    text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-0"
            required
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="absolute top-3 -z-10 m-3 origin-[0]  -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0  peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-bold peer-focus:text-gray-500"
          >
            Email address
          </label>
        </div>
        {/* email */}
        {/* password */}
        <div className="border-gray group relative z-0 mb-4 w-full border-[1px] ">
          <input
            type="password"
            name="password"
            id="floating_password"
            className="peer m-3  block w-full appearance-none border-gray-300  bg-transparent px-0 py-2.5   text-sm font-semibold    text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-0"
            required
            placeholder=" "
            minLength={6}
            maxLength={60}
          />
          <label
            htmlFor="floating_password"
            className="absolute  top-3 -z-10 m-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:left-0  peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-gray-500"
          >
            Add a password (6-60 characters)
          </label>
        </div>
        {/* password */}
        <button
          type="submit"
          className="mt-3 flex  h-16  w-full items-center justify-center rounded-md bg-[#e50914]  text-xl font-semibold text-white hover:bg-[#f6121d]"
        >
          {loading ? <BiLoader /> : "Next"}
        </button>
      </form>
    </SignUpLayout>
  );
};

export default UserRegistration;
