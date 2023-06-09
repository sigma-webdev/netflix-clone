import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import Accordian from "../components/accordian/Accordian.jsx";
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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const USER_DATA = useSelector((state) => state.auth.user);

  const accordianHandler = (id) => {
    setActiveItem(id);
  };

  async function handleIsUserExist(e) {
    e.preventDefault();
    const isUserExist = await dispatch(IS_USER_EXIST(e.target));
    if (isUserExist.payload.data.success) {
      localStorage.setItem("email", e.target.email.value);
      navigate(`/signup/password`);
    } else {
      alert(isUserExist.payload.data.message);
    }
  }

  return (
    <Layout isLogin={false}>
      <div className="text-white bg-netflix-blue relative">
        <section>
          <div className="bg-netflix-home bg-repeat-no bg-cover h-[50rem] w-full opacity-40 "></div>
          <div className="absolute top-52 left-20  w-auto space-y-4">
            <h1 className="font-bold text-2xl sm:4xl md:text-6xl">
              Unlimited movies,
              <br /> TV shows and more
            </h1>
            <p className="font-bold md:text-2xl text-xl">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="md:text-2xl text-xl text-bold">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            {isLoggedIn && USER_DATA.plan === "NONE" ? (
              <Link to="/signup/choose">
                <button
                  type="submit"
                  className="align-middle text-2xl px-6 py-3 font-bold bg-red-600 rounded text-white hover:bg-red-700"
                >
                  Finish singUp
                  <StartIcon />
                </button>
              </Link>
            ) : (
              <form
                className="flex flex-wrap md:space-x-4"
                onSubmit={(e) => handleIsUserExist(e)}
              >
                <div className="relative z-0 max-w-80 md:w-96 mb-6 group bg-black border-2 rounded text-sm opacity-75">
                  <input
                    type="email"
                    name="email"
                    id="floating_email"
                    className="block p-4 w-full bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:text-sm absolute text-xl px-4 pb-1 pt-1 text-slate-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Email address
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    className="align-middle text-2xl px-6 py-3 font-bold bg-red-600 rounded text-white hover:bg-red-700"
                  >
                    Get Started
                    <StartIcon />
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section className="mx-8 md:mx-8 lg:mx-14">
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

        <section className="w-[80%] mx-auto md:mx-8 lg:mx-14 space-y-4">
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

          <p className="text-2xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form className="flex space-x-4">
            <div className="relative z-0 max-w-80 md:w-96 mb-6 group bg-black border-2 rounded text-sm opacity-75">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block p-4 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-xl px-4 pb-2 text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Email address
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="align-middle text-2xl px-6 py-3 font-bold bg-red-600 rounded text-white hover:bg-red-700"
              >
                <Link to="/signup">Get Started</Link>
                <StartIcon />
              </button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
