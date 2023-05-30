import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// components
import Accordian from "../components/accordian/accordian.jsx";
import Layout from "../components/layout/Layout";
import FeatureCard from "../components/card/FeatureCard";
import AccordianItem from "../components/accordian/AccordianItem.jsx";

// icons
import { StartIcon } from "../components/icons.jsx";

import { faqs, features } from "../data";

const Home = () => {
  const [activeItem, setActiveItem] = useState(-1);
  const navigate = useNavigate();

  const accordianHandler = (id) => {
    setActiveItem(id);
  };

  const handleSignin = (e) => {
    e.preventDefault();
    navigate("/signin");
  };
  return (
    <Layout isLogin={false}>
      <div className="px-4 sm:px-8 md:px-12 text-white bg-netflix-blue">
        <section className="relative ">
          <div className="bg-netflix-home h-[36rem] w-full opacity-40 rounded-lg"></div>
          <div className="absolute top-0 left-0 z-10 w-auto mx-4 md:mx-8 lg:mx-12 my-8 md:my-12 lg:my-24 space-y-4">
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

            <form
              className="flex flex-wrap md:space-x-4"
              onSubmit={(e) => handleSignin(e)}
            >
              <div className="relative z-0 max-w-80 md:w-96 mb-6 group bg-black border-2 rounded text-sm opacity-75">
                <input
                  type="email"
                  name="floating_email"
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
