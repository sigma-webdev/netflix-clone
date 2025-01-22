import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "email-validator";
import toast from "react-hot-toast";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import Accordian from "../components/accordian/Accordian";
import FeatureCard from "../components/card/FeatureCard";
import AccordianItem from "../components/accordian/AccordianItem.jsx";
import { IS_USER_EXIST } from "../store/authSlice.js";
import { faqs, features } from "../data";
import HomeLayout from "../components/layout/home/HomeLayout";

const Home = () => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(-1);
  const navigate = useNavigate();
  const { IS_LOGGED_IN, loading } = useSelector((state) => state.auth);
  const USER_DATA = useSelector((state) => state.auth.userData);
  const email = localStorage.getItem("netflixCloneEmail");

  // handler for accordion
  const accordianHandler = (id) => {
    setActiveItem(id);
  };

  const handleIsUserExist = async (e) => {
    e.preventDefault();
    const isEmailValid = validator.validate(e?.target?.email?.value);
    if (!isEmailValid) return toast.error("please enter valid email 📩");
    const isUserExist = await dispatch(IS_USER_EXIST(e.target));
    if (isUserExist?.payload?.data?.isUserExist) {
      navigate(`/signin/${e?.target?.email?.value}`);
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    if (email) {
      navigate("/browse");
    } else {
      navigate("/");
    }
  }, [email, navigate]);

  return (
    <HomeLayout>
      <div className="relative bg-[#000000] text-white">
        {/* hero section */}
        <section className="mx-auto w-full">
          <div className="bg-repeat-no h-[35rem] bg-netflix-home bg-cover md:h-[45rem]">
            <div
              className="bg-[rgb(0 0 0 / 40%)] flex h-full w-full items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.9) 100%)",
              }}
            >
              <div className="space-y-4">
                <div className="flex w-auto flex-col items-center space-y-4 px-2 text-center">
                  <h1 className="text-2xl font-bold sm:text-4xl md:text-5xl">
                    Unlimited movies, TV shows and more
                  </h1>
                  <p className="text-md font-semibold sm:text-xl md:text-2xl">
                    Watch anywhere. Cancel anytime.
                  </p>
                  <p className="text-md font-semibold sm:text-xl md:text-2xl">
                    Ready to watch? Enter your email to create or restart your
                    membership.
                  </p>
                </div>

                {loading ? (
                  "loading"
                ) : (
                  <div className="flex justify-center">
                    {IS_LOGGED_IN && USER_DATA.plan === "NONE" ? (
                      <Link
                        to="/signup/choose"
                        className="mt-5 rounded bg-red-600 px-4 py-2 align-middle text-lg font-medium text-white hover:bg-red-700"
                      >
                        Finish signUp
                        <MdOutlineKeyboardArrowRight />
                      </Link>
                    ) : (
                      <form
                        className="flex w-[80%] flex-col items-center justify-center gap-2 md:flex-row md:gap-4 lg:gap-6"
                        onSubmit={(e) => handleIsUserExist(e)}
                      >
                        <div className="group relative z-0 w-full rounded border-2 bg-black text-sm opacity-75 sm:w-96">
                          <input
                            type="email"
                            name="email"
                            id="floating_email"
                            className="peer block w-full appearance-none bg-transparent p-3 focus:border-blue-600 focus:outline-none focus:ring-0 md:p-4 lg:p-5"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="floating_email"
                            className="md:text-md absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform px-4 pb-1 pt-1 text-sm text-slate-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-sm lg:text-lg"
                          >
                            Email address
                          </label>
                        </div>
                        <div>
                          <button
                            className="md:text-md flex h-10 items-center rounded bg-red-600 px-2 text-sm font-bold text-white hover:bg-red-700 md:h-12 md:px-4 lg:h-14 lg:px-6 lg:text-lg"
                            type="submit"
                          >
                            Get Started <MdKeyboardArrowRight />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* features section */}
        <section className="mx-auto max-w-[90%] space-y-2 md:max-w-[85%] lg:max-w-[80%]">
          {features &&
            features.map((item, index) => {
              return (
                <FeatureCard
                  key={item.id}
                  featureHeading={item.featureHeading}
                  featureImage={item.featureImage}
                  aboutFeature={item.aboutFeature}
                  currentIndex={index}
                ></FeatureCard>
              );
            })}
        </section>

        {/* faq section */}
        <section className="mx-auto max-w-[90%] space-y-4 py-5 md:max-w-[85%] lg:max-w-[80%]">
          <h2 className="text-xl font-bold md:text-3xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <Accordian>
            {faqs.map((item) => {
              return (
                <AccordianItem
                  accordianData={item}
                  accordianHandler={accordianHandler}
                  isActive={item.id === activeItem ? true : false}
                  question={item.question}
                  answer={item.answer}
                  id={item.id}
                  key={item.id}
                ></AccordianItem>
              );
            })}
          </Accordian>
        </section>

        {/* get started */}
        <section className="mx-auto max-w-[90%] space-y-4 py-5 md:max-w-[85%] lg:max-w-[80%]">
          <p className="text-lg md:text-xl lg:text-2xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          {loading ? (
            "loading"
          ) : (
            <div className="flex">
              {IS_LOGGED_IN && USER_DATA.plan === "NONE" ? (
                <Link
                  to="/signup/choose"
                  className="mt-5 rounded bg-red-600 px-4 py-2 align-middle text-lg font-medium text-white hover:bg-red-700"
                >
                  Finish signUp
                  <MdOutlineKeyboardArrowRight />
                </Link>
              ) : (
                <form
                  className="flex w-[80%] flex-col gap-2 md:flex-row md:items-center md:gap-4 lg:gap-6"
                  onSubmit={(e) => handleIsUserExist(e)}
                >
                  <div className="group relative z-0 w-full rounded border-2 bg-black text-sm opacity-75 sm:w-96">
                    <input
                      type="email"
                      name="email"
                      id="floating_email"
                      className="peer block w-full appearance-none bg-transparent p-3 focus:border-blue-600 focus:outline-none focus:ring-0 md:p-4 lg:p-5"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="md:text-md absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform px-4 pb-1 pt-1 text-sm text-slate-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-sm lg:text-lg"
                    >
                      Email address
                    </label>
                  </div>
                  <div>
                    <button
                      className="md:text-md flex h-10 items-center rounded bg-red-600 px-2 text-sm font-bold text-white hover:bg-red-700 md:h-12 md:px-4 lg:h-14 lg:px-6 lg:text-lg"
                      type="submit"
                    >
                      Get Started <MdKeyboardArrowRight />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </section>
      </div>
    </HomeLayout>
  );
};

export default Home;
