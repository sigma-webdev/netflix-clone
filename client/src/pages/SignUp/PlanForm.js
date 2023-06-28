import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CREATE_SUBSCRIPTION,
  GET_RAZORPAY_KEY,
  VERIFY_SUBSCRIPTION,
} from "../../store/razorpaySlice.js";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";
import SignUpLayout from "./SignUpLayout.js";

function PlanForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [plan, setPlan] = useState("PREMIUM");
  const [buttonLoading, setButtonLoading] = useState(false);

  const RAZORPAY_KEY = useSelector((state) => state.razorpay.razorpaykey);
  const SUBSCRIPTION_ID = useSelector((state) => state.razorpay.subscriptionId);
  const RASORPAY_KEY_LOADING = useSelector(
    (state) => state.razorpay.razorpayKeyLoading
  );
  const CREATE_SUBSCRIPTION_LOADING = useSelector(
    (state) => state.razorpay.createSbuscriptionLoading
  );

  useEffect(() => {
    setButtonLoading(RASORPAY_KEY_LOADING || CREATE_SUBSCRIPTION_LOADING);
  }, [RASORPAY_KEY_LOADING, CREATE_SUBSCRIPTION_LOADING]);

  // for storing the payment details after successful transaction
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handlesubmit(e) {
    await dispatch(GET_RAZORPAY_KEY());
    await dispatch(CREATE_SUBSCRIPTION({ planName: plan }));
  }

  function razorpayPaymentModel() {
    const options = {
      key: RAZORPAY_KEY,
      subscription_id: SUBSCRIPTION_ID,
      name: `Netflix clone ${plan}`,
      description: "Monthly Subscription",
      handler: async function (response) {
        paymentDetails.razorpayPaymentId = response.razorpay_payment_id;
        paymentDetails.razorpaySubscriptionId =
          response.razorpay_subscription_id;
        paymentDetails.razorpaySignature = response.razorpay_signature;

        // verifying the payment
        const verifySubscription = await dispatch(
          VERIFY_SUBSCRIPTION({ ...paymentDetails, plan })
        );
        const isPaymentVerified = verifySubscription.payload.success;

        // redirecting the user according to the verification status
        if (isPaymentVerified) {
          toast.success(verifySubscription.payload.message);
          navigate("/signup/paymentSuccess");
        } else {
          toast.error(verifySubscription.payload.message);
          navigate("/signup/paymentfail");
        }
      },
      theme: {
        color: "#e50914",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    if (!buttonLoading && RAZORPAY_KEY && SUBSCRIPTION_ID) {
      razorpayPaymentModel();
    }
  }, [RAZORPAY_KEY, SUBSCRIPTION_ID, buttonLoading]);

  return (
    <SignUpLayout>
      <div className=" max-w-[1020px]  m-auto mt-10 mb-28">
        <p className="text-[#333]">
          STEP <span className="font-bold">1</span> OF {""}
          <span className="font-bold">3</span>
        </p>
        <p className="text-[#333] text-3xl  mb-3 font-bold">
          Choose the plan that’s right for you
        </p>
        <ul>
          <li className="text-lg text-[#333]   font-semibold mb-2 flex gap-2">
            <AiOutlineCheck /> Watch all you want. Ad-free..{" "}
          </li>
          <li className="text-lg text-[#333] mb-2 flex gap-2 font-semibold">
            <AiOutlineCheck /> Everything on Netflix for one low price.
          </li>
          <li className="text-lg text-[#333] mb-2 flex gap-2 font-semibold">
            <AiOutlineCheck /> No ads and no extra fees. Ever.
          </li>
        </ul>
        <div className="flex gap-4 justify-between my-5 items-center">
          {/* PREMIUM */}
          <div
            className="cursor-pointer  shadow-lg h-[262px] rounded-md border-[1px] border-gray-200 "
            onClick={() => setPlan("PREMIUM")}
          >
            <div
              className={
                plan === "PREMIUM"
                  ? "h-[76] px-3  py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-red-600  to-purple-600"
                  : "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"
              }
            >
              {plan === "PREMIUM" ? <AiOutlineCheckCircle /> : null}
              <div>
                <p
                  className={
                    plan === "PREMIUM"
                      ? "font-bold text-xl text-white "
                      : "font-bold text-xl"
                  }
                >
                  Premium <br /> 649/mo.
                </p>
              </div>
            </div>
            <ul className="p-4">
              <li className=" text-sm font-semibold">
                Our best video quality in 4K and HDR
              </li>
              <li className=" text-sm font-semibold">
                Watch on your TV, computer, mobile phone and tablet
              </li>
              <li className=" text-sm font-semibold">Downloads available</li>
            </ul>
          </div>
          {/* PREMIUM END */}
          {/* STANDARD */}
          <div
            className="cursor-pointer  shadow-lg h-[262px] rounded-md border-[1px] border-gray-200"
            onClick={() => setPlan("STANDARD")}
          >
            <div
              className={
                plan === "STANDARD"
                  ? "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-[#333e9a]  to-[#a838d7]"
                  : "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-500"
              }
            >
              {plan === "STANDARD" ? <AiOutlineCheckCircle /> : null}
              <div>
                <p
                  className={
                    plan === "STANDARD"
                      ? "font-bold text-xl text-white "
                      : "font-bold text-xl"
                  }
                >
                  Standard <br /> 499/mo.
                </p>
              </div>
            </div>
            <ul className="p-3">
              <li className="text-sm font-semibold">
                Our best video quality in 4K and HDR
              </li>
              <li className="text-sm font-semibold">
                Watch on your TV, computer, mobile phone and tablet
              </li>
              <li className="text-sm font-semibold">Downloads available</li>
            </ul>
          </div>
          {/* STANDARD END */}
          {/* BASIC */}
          <div
            className="cursor-pointer  shadow-lg h-[262px] rounded-md border-[1px] border-gray-200"
            onClick={() => setPlan("BASIC")}
          >
            <div
              className={
                plan === "BASIC"
                  ? "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-[#343e99]  to-[#6a3bdf]"
                  : "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"
              }
            >
              {plan === "BASIC" ? <AiOutlineCheckCircle /> : null}
              <div>
                <p
                  className={
                    plan === "BASIC"
                      ? "font-bold text-xl text-white "
                      : "font-bold text-xl"
                  }
                >
                  Basic <br /> 199/mo.
                </p>
              </div>
            </div>
            <ul className="p-3">
              <li className="text-sm font-semibold">
                Our best video quality in 4K and HDR
              </li>
              <li className="text-sm font-semibold">
                Watch on your TV, computer, mobile phone and tablet
              </li>
              <li className="text-sm font-semibold">Downloads available</li>
            </ul>
          </div>
          {/* BASIC END */}
          {/* MOBILE */}
          <div
            className="cursor-pointer  shadow-lg h-[262px] rounded-md border-[1px] border-gray-200"
            onClick={() => setPlan("MOBILE")}
          >
            <div
              className={
                plan === "MOBILE"
                  ? "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-[#31409a]  to-[#256ad6]"
                  : "h-[76] px-3 py-4 flex gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-500"
              }
            >
              {plan === "MOBILE" ? <AiOutlineCheckCircle /> : null}
              <div>
                <p
                  className={
                    plan === "MOBILE"
                      ? "font-bold text-xl text-white "
                      : "font-bold text-xl"
                  }
                >
                  Mobile <br /> 149/mo.
                </p>
              </div>
            </div>
            <ul className="p-3">
              <li className="text-sm font-semibold">
                Our best video quality in 4K and HDR
              </li>
              <li className="text-sm font-semibold">
                Watch on your TV, computer, mobile phone and tablet
              </li>
              <li className="text-sm font-semibold">Downloads available</li>
            </ul>
          </div>
          {/* MOBILE END */}
        </div>

        <p className="text-sm text-gray-500 mb-2">
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
          to your internet service and device capabilities. Not all content is
          available in all resolutions. See our Terms of Use for more details.
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Only people who live with you may use your account. Watch on 4
          different devices at the same time with Premium, 2 with Standard, and
          1 with Basic and Mobile.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => handlesubmit()}
            className="mt-3  max-w-[440px] bg-[#e50914]  rounded-md  h-16 w-full hover:bg-[#f6121d] text-white font-semibold  text-xl flex items-center justify-center"
          >
            {buttonLoading ? <BiLoader /> : "Next"}
          </button>
        </div>
      </div>
    </SignUpLayout>
  );
}

export default PlanForm;
