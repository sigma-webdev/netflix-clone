import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SignUpLayout from "./SignUpLayout";
import { GET_USER } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/browse", { replace: true });
  };

  useEffect(() => {
    dispatch(GET_USER());
  }, [dispatch]);

  return (
    <SignUpLayout>
      <div className=" m-auto my-10 flex w-[460px] flex-col bg-[#f3f3f3] p-10 shadow-xl">
        <h2 className="mb-5">payment successful</h2>
        <p className="mb-2 text-lg "></p>
        <button
          className="h-10 w-full bg-[#017bf5] text-lg font-semibold text-white hover:bg-[#2490fd]"
          onClick={handleRedirect}
        >
          Browse Movies Now...
        </button>
      </div>
    </SignUpLayout>
  );
};

export default PaymentSuccess;
