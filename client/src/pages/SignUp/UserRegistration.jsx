import { useState, useEffect } from "react";
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

  const [signUpData, setSignUpData] = useState({
    email: localStorage.getItem("netflixCloneEmail") || "",
    password: "",
  });

  const loading = useSelector((state) => state.auth.loading);

  // function to set the signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;

    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!signUpData.email || !signUpData?.password) {
      toast.error("Please fill all the fields");
      return;
    }

    // Validate email
    const isEmailValid = validator.validate(signUpData.email);
    if (!isEmailValid) {
      toast.error("Please enter a valid email 📩");
      return;
    }

    console.log(isEmailValid);

    try {
      // Dispatch SIGN_UP action
      const response = await dispatch(SIGN_UP(signUpData)).unwrap();

      // Check for success in the response payload
      if (response?.success) {
        toast.success("Signup successful. Please signin");
        navigate("/signup/checkplan");
      } else {
        toast.error(response?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SignUpLayout>
      <form className="m-auto my-10 max-w-[440px]">
        <p className="text-[#333]">
          STEP <span className="font-bold">1</span> OF {""}
          <span className="font-bold">3</span>
        </p>
        <p className="mb-3 text-3xl font-bold text-[#333]">
          Create a password to start your membership
        </p>
        <p className="mb-2 text-xl text-[#333]">
          Just a few more steps and you're done!
        </p>
        <p className="mb-2 text-xl text-[#333]">We hate paperwork, too.</p>
        {/* email */}
        <div className="border-gray group relative z-0 mb-4 w-full border-[1px]">
          <input
            type="email"
            name="email"
            id="floating_email"
            className="peer m-3 block w-full appearance-none border-gray-300 bg-transparent px-0 py-2.5 text-sm font-semibold text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-0"
            required
            defaultValue={signUpData.email}
            onChange={handleUserInput}
            placeholder=" "
          />
          <label
            htmlFor="floating_email"
            className="absolute top-3 -z-10 m-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-bold peer-focus:text-gray-500"
          >
            Email address
          </label>
        </div>
        {/* email */}
        {/* password */}
        <div className="border-gray group relative z-0 mb-4 w-full border-[1px]">
          <input
            type="password"
            name="password"
            id="floating_password"
            className="peer m-3 block w-full appearance-none border-gray-300 bg-transparent px-0 py-2.5 text-sm font-semibold text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-0"
            required
            placeholder=" "
            minLength={6}
            maxLength={60}
            value={signUpData.password}
            onChange={handleUserInput}
          />
          <label
            htmlFor="floating_password"
            className="absolute top-3 -z-10 m-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-gray-500"
          >
            Add a password (6-60 characters)
          </label>
        </div>
        {/* password */}
        <button
          onClick={(e) => handleSubmit(e)}
          className="mt-3 flex h-16 w-full items-center justify-center rounded-md bg-[#e50914] text-xl font-semibold text-white hover:bg-[#f6121d]"
        >
          {loading ? <BiLoader /> : "Next"}
        </button>
      </form>
    </SignUpLayout>
  );
};

export default UserRegistration;
