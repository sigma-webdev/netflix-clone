import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "email-validator";
import toast from "react-hot-toast";

// components
import Accordian from "../components/accordian/Accordian";
import Layout from "../components/layout/Layout";
import FeatureCard from "../components/card/FeatureCard";
import AccordianItem from "../components/accordian/AccordianItem.jsx";

// thunk
import { IS_USER_EXIST } from "../store/authSlice.js";
// icons
import { StartIcon } from "../components/icons.jsx";
import { faqs, features } from "../data";
const Home = () => {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(-1);
  const navigate = useNavigate();
  const IS_LOGGED_IN = useSelector((state) => state.auth.isLoggedIn);
  const GET_USER_LOADING = useSelector((state) => state.auth.getUserLoading);
  const USER_DATA = useSelector((state) => state.auth.userData);

  console.log(IS_LOGGED_IN && USER_DATA.plan === "NONE");

  const accordianHandler = (id) => {
    setActiveItem(id);
  };

  async function handleIsUserExist(e) {
    e.preventDefault();

    const isEmailValid = validator.validate(e.target.email.value);
    if (!isEmailValid) return toast.error("please enter valid email 📩");
    const isUserExist = await dispatch(IS_USER_EXIST(e.target));
    if (isUserExist.payload.data.isUserExist) {
      navigate("/signup/password");
    } else {
      navigate("signup/registration");
    }
  }

  return (
    <Layout isLogin={false}>
      <div className="relative bg-[#000000] text-white">
        <section>
          <div className="bg-repeat-no h-[43.75rem] bg-netflix-home bg-cover">
            <div
              className="bg-[rgb(0 0   0 / 40%)] h-[43.75rem] w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.9) 100%)",
              }}
            ></div>
          </div>
          <div className="absolute left-20 top-52  w-auto space-y-4">
            <h1 className="sm:4xl text-2xl font-bold md:text-6xl">
              Unlimited movies,
              <br /> TV shows and more
            </h1>
            <p className="text-xl font-bold md:text-2xl">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="text-bold text-xl md:text-2xl">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            {GET_USER_LOADING ? (
              "loading"
            ) : (
              <>
                {IS_LOGGED_IN && USER_DATA.plan === "NONE" ? (
                  <Link to="/signup/choose">
                    <button
                      type="submit"
                      className="mt-5 rounded bg-red-600 px-4 py-2 align-middle text-lg font-medium text-white hover:bg-red-700"
                    >
                      Finish signUp
                      <StartIcon />
                    </button>
                  </Link>
                ) : (
                  <form
                    className="flex flex-wrap md:space-x-4"
                    onSubmit={(e) => handleIsUserExist(e)}
                  >
                    <div className="max-w-80 group relative z-0 mb-6 rounded border-2 bg-black text-sm opacity-75 md:w-96">
                      <input
                        type="email"
                        name="email"
                        id="floating_email"
                        className="peer block w-full appearance-none bg-transparent p-4 focus:border-blue-600 focus:outline-none focus:ring-0"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_email"
                        className="absolute top-2 -z-10 origin-[0] -translate-y-6 scale-75 transform px-4 pb-1 pt-1 text-xl text-slate-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-sm"
                      >
                        Email address
                      </label>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="rounded bg-red-600 px-6 py-3 align-middle text-2xl font-bold text-white hover:bg-red-700"
                      >
                        Get Started
                        <StartIcon />
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-[80vw]">
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

        <section className="mx-auto max-w-[80vw] space-y-4">
          <h2 className="font-bold">Frequently Asked Questions</h2>
          <Accordian>
            {faqs.map((item) => {
              return (
                <AccordianItem
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
          {!IS_LOGGED_IN && USER_DATA.plan === "NONE" ? (
            <>
              <p className="text-2xl">
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
              <form className="flex space-x-4">
                <div className="max-w-80 group relative z-0 mb-6 rounded border-2 bg-black text-sm opacity-75 md:w-96">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="peer block w-full appearance-none bg-transparent p-4 text-sm focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform px-4 pb-2 text-xl text-slate-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:font-medium"
                  >
                    Email address
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="rounded bg-red-600 px-6 py-3 align-middle text-2xl font-bold text-white hover:bg-red-700"
                  >
                    <Link to="/signup">Get Started</Link>
                    <StartIcon />
                  </button>
                </div>
              </form>
            </>
          ) : null}

          {IS_LOGGED_IN && USER_DATA.plan === "NONE" ? (
            <Link to="/signup/choose">
              <button
                type="button"
                className=" mt-4 rounded bg-red-600 px-6 py-3 align-middle text-2xl font-bold text-white hover:bg-red-700"
              >
                Finish signup
                <StartIcon />
              </button>
            </Link>
          ) : null}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
