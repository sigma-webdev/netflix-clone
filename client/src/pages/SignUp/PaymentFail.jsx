import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignUpLayout from "./SignUpLayout";

const PaymentFail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = setTimeout(() => navigate("/"), 30000);
    return () => clearTimeout(redirect);
  }, []);

  return (
    <SignUpLayout>
      <div className=" w-[460px] p-10 shadow-xl flex flex-col bg-[#f3f3f3] m-auto my-20">
        <h2 className="mb-5">payment fail</h2>
        <p className=" text-lg mb-2"></p>
        <p className=" text-lg mb-2">
          You’ll be redirected to plan form page in 30 seconds.
        </p>
        <Link to="/signup/planform">
          <button className="   w-full text-lg  text-white h-10  font-semibold bg-[#017bf5] hover:bg-[#2490fd]   ">
            Retry
          </button>
        </Link>
      </div>
    </SignUpLayout>
  );
};

export default PaymentFail;
