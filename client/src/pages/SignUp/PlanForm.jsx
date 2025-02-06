import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CREATE_SUBSCRIPTION,
  GET_PLANS,
  GET_RAZORPAY_KEY,
  VERIFY_SUBSCRIPTION,
} from "../../store/razorpaySlice.js";
import { AiOutlineCheck, AiOutlineCheckCircle } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";
import SignUpLayout from "./SignUpLayout.jsx";

const PlanForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const RAZORPAY_KEY = useSelector((state) => state.razorpay.razorPayKey);
  const SUBSCRIPTION_ID = useSelector((state) => state.razorpay.subscriptionId);
  const PLANS = useSelector((state) => state.razorpay.plan);
  const RASORPAY_KEY_LOADING = useSelector(
    (state) => state.razorpay.razorpayKeyLoading
  );
  const CREATE_SUBSCRIPTION_LOADING = useSelector(
    (state) => state.razorpay.createSubscriptionLoading
  );
  const GET_PLANS_LOADING = useSelector(
    (state) => state.razorpay.getPlanLoading
  );

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        await dispatch(GET_PLANS()).unwrap();
      } catch (error) {
        toast.error("Failed to fetch plans");
      }
    };
    fetchPlans();
  }, [dispatch]);

  useEffect(() => {
    setSelectedPlan(PLANS[0]);
  }, [PLANS]);

  useEffect(() => {
    setButtonLoading(RASORPAY_KEY_LOADING || CREATE_SUBSCRIPTION_LOADING);
  }, [RASORPAY_KEY_LOADING, CREATE_SUBSCRIPTION_LOADING]);

  // for storing the payment details after successful transaction
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleSubmit = () => {
    dispatch(GET_RAZORPAY_KEY());
    dispatch(CREATE_SUBSCRIPTION({ planId: selectedPlan.planId }));
  };

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData?.subscription?.status === "active") {
      navigate("/browse");
    }
  }, [navigate, userData?.subscription?.status]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function razorpayPaymentModel() {
    const options = {
      key: RAZORPAY_KEY,
      subscription_id: SUBSCRIPTION_ID,
      name: `Netflix clone ${selectedPlan.planName}`,
      description: "Monthly Subscription",
      handler: async function (response) {
        paymentDetails.razorpayPaymentId = response.razorpay_payment_id;
        paymentDetails.razorpaySubscriptionId =
          response.razorpay_subscription_id;
        paymentDetails.razorpaySignature = response.razorpay_signature;

        // verifying the payment
        const verifySubscription = await dispatch(
          VERIFY_SUBSCRIPTION({
            ...paymentDetails,
            plan: selectedPlan.planName,
          })
        );

        const isPaymentVerified = verifySubscription.payload.data.success;

        // redirecting the user according to the verification status
        if (isPaymentVerified) {
          toast.success(verifySubscription.payload.data.message);
          navigate("/signup/paymentSuccess");
        } else {
          toast.error(verifySubscription.payload.data.message);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RAZORPAY_KEY, SUBSCRIPTION_ID, buttonLoading]);

  return (
    <SignUpLayout>
      <div className=" m-auto  mb-28 mt-10 max-w-[1020px]">
        <p className="text-[#333]">
          STEP <span className="font-bold">1</span> OF {""}
          <span className="font-bold">3</span>
        </p>
        <p className="mb-3 text-3xl  font-bold text-[#333]">
          Choose the plan that’s right for you
        </p>
        <p> You don't have active plan, Please subscribe first!</p>
        <ul>
          <li className="mb-2 flex   gap-2 text-lg font-semibold text-[#333]">
            <AiOutlineCheck /> Watch all you want. Ad-free..{" "}
          </li>
          <li className="mb-2 flex gap-2 text-lg font-semibold text-[#333]">
            <AiOutlineCheck /> Everything on Netflix for one low price.
          </li>
          <li className="mb-2 flex gap-2 text-lg font-semibold text-[#333]">
            <AiOutlineCheck /> No ads and no extra fees. Ever.
          </li>
        </ul>
        <div className="my-5 flex items-center justify-between gap-4">
          {/* PREMIUM */}

          {GET_PLANS_LOADING === false ? (
            PLANS?.map((e) => {
              return (
                <div key={e._id}>
                  <div
                    className="h-[262px]  cursor-pointer rounded-md border-[1px] border-gray-200 shadow-lg "
                    onClick={() => setSelectedPlan(e)}
                  >
                    <div
                      className={
                        selectedPlan.planName === e.planName
                          ? "flex h-[76]  gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-red-600 to-purple-600 px-3  py-4"
                          : "flex h-[76] gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-4"
                      }
                    >
                      {selectedPlan.planName === e.planName ? (
                        <AiOutlineCheckCircle />
                      ) : null}
                      <div>
                        <p
                          className={
                            selectedPlan.planName === e.planName
                              ? "text-xl font-bold text-white "
                              : "text-xl font-bold"
                          }
                        >
                          {e.planName} <br /> {e.amount}/mo.
                        </p>
                      </div>
                    </div>
                    <ul className="p-4">
                      <li className="text-sm font-semibold ">
                        {e.description}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <AiOutlineCheckCircle />
          )}

          {/* <div
            className="h-[262px]  cursor-pointer rounded-md border-[1px] border-gray-200 shadow-lg "
            onClick={() => setPlan("plan_PkVeacUfjYvgHO")}
          >
            <div
              className={
                plan === "PREMIUM"
                  ? "flex h-[76]  gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-red-600 to-purple-600 px-3  py-4"
                  : "flex h-[76] gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-4"
              }
            >
              {plan === "PREMIUM" ? <AiOutlineCheckCircle /> : null}
              <div>
                <p
                  className={
                    plan === "PREMIUM"
                      ? "text-xl font-bold text-white "
                      : "text-xl font-bold"
                  }
                >
                  Premium <br /> 649/mo.
                </p>
              </div>
            </div>
            <ul className="p-4">
              <li className="text-sm font-semibold ">
                Our best video quality in 4K and HDR
              </li>
              <li className="text-sm font-semibold ">
                Watch on your TV, computer, mobile phone and tablet
              </li>
              <li className="text-sm font-semibold ">Downloads available</li>
            </ul>
          </div> */}
          {/* PREMIUM END */}
          {/* STANDARD */}
          {/* <div
            className="h-[262px]  cursor-pointer rounded-md border-[1px] border-gray-200 shadow-lg"
            onClick={() => setPlan("plan_PkVeacUfjYvgHO")}
          >
            <div
              className={
                plan === "STANDARD"
                  ? "flex h-[76] gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-[#333e9a] to-[#a838d7] px-3  py-4"
                  : "flex h-[76] gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-4"
              }
            >
              {plan === "STANDARD" ? <AiOutlineCheckCircle /> : null}
              <div>
                <p
                  className={
                    plan === "STANDARD"
                      ? "text-xl font-bold text-white "
                      : "text-xl font-bold"
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
          </div> */}
          {/* STANDARD END */}
          {/* BASIC */}
          {/* <div
            className="h-[262px]  cursor-pointer rounded-md border-[1px] border-gray-200 shadow-lg"
            onClick={() => setPlan("plan_PkVeacUfjYvgHO")}
          >
            <div
              className={
                plan === "BASIC"
                  ? "flex h-[76] gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-[#343e99] to-[#6a3bdf] px-3  py-4"
                  : "flex h-[76] gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-4"
              }
            >
              {plan === "BASIC" ? <AiOutlineCheckCircle /> : null}
              <div>
                <p
                  className={
                    plan === "BASIC"
                      ? "text-xl font-bold text-white "
                      : "text-xl font-bold"
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
          </div> */}
          {/* BASIC END */}
          {/* MOBILE */}
          {/* <div
            className="h-[262px]  cursor-pointer rounded-md border-[1px] border-gray-200 shadow-lg"
            onClick={() => setPlan("plan_PkVeacUfjYvgHO")}
          >
            <div
              className={
                plan === "MOBILE"
                  ? "flex h-[76] gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-[#31409a] to-[#256ad6] px-3  py-4"
                  : "flex h-[76] gap-3 rounded-t-md border-gray-200 bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-4"
              }
            >
              {plan === "MOBILE" ? <AiOutlineCheckCircle /> : null}
              <div>
                <p
                  className={
                    plan === "MOBILE"
                      ? "text-xl font-bold text-white "
                      : "text-xl font-bold"
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
          </div> */}
          {/* MOBILE END */}
        </div>

        <p className="mb-2 text-sm text-gray-500">
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject
          to your internet service and device capabilities. Not all content is
          available in all resolutions. See our Terms of Use for more details.
        </p>
        <p className="mb-2 text-sm text-gray-500">
          Only people who live with you may use your account. Watch on 4
          different devices at the same time with Premium, 2 with Standard, and
          1 with Basic and Mobile.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => handleSubmit()}
            className="mt-3  flex h-16  w-full  max-w-[440px] items-center justify-center rounded-md bg-[#e50914]  text-xl font-semibold text-white hover:bg-[#f6121d]"
          >
            {buttonLoading ? <BiLoader /> : "Next"}
          </button>
        </div>
      </div>
    </SignUpLayout>
  );
};

export default PlanForm;
