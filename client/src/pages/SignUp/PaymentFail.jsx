import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignUpLayout from "./SignUpLayout";

const PaymentFail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const redirect = setTimeout(() => navigate("/"), 30000);
    return () => clearTimeout(redirect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SignUpLayout>
      <div className=" m-auto my-20 flex w-[460px] flex-col bg-[#f3f3f3] p-10 shadow-xl">
        <h2 className="mb-5">payment fail</h2>
        <p className="mb-2 text-lg "></p>
        <p className="mb-2 text-lg ">
          You’ll be redirected to plan form page in 30 seconds.
        </p>
        <Link to="/signup/planform">
          <button className="   h-10 w-full  bg-[#017bf5] text-lg  font-semibold text-white hover:bg-[#2490fd]   ">
            Retry
          </button>
        </Link>
      </div>
    </SignUpLayout>
  );
};

export default PaymentFail;
