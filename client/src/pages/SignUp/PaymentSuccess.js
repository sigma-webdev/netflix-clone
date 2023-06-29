import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignUpLayout from "./SignUpLayout";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = setTimeout(() => navigate("/"), 30000);
    return () => clearTimeout(redirect);
  }, []);
  return (
    <SignUpLayout>
      <div className=" w-[460px] p-10 shadow-xl flex flex-col bg-[#f3f3f3] m-auto my-10">
        <h2 className="mb-5">payment successful</h2>
        <p className=" text-lg mb-2"></p>
        <p className=" text-lg mb-2">
          You’ll be redirected to Home page in 30 seconds.
        </p>
        <Link to="/">
          <button className="   w-full text-lg  text-white h-10  font-semibold bg-[#017bf5] hover:bg-[#2490fd]   ">
            Go Now
          </button>
        </Link>
      </div>
    </SignUpLayout>
  );
};

export default PaymentSuccess;
