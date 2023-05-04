import { Link } from "react-router-dom";
import show1 from ".././assets/images/show1.png";
import show2 from ".././assets/images/show2.png";
import show3 from ".././assets/images/show3.png";
import show4 from ".././assets/images/show4.png";
import Accordian from ".././components/accordian/Accordian";
import Layout from "../components/layout/Layout";
import FeatureCard from "../components/card/FeatureCard";

const Home = () => {
  return (
    <Layout bgcolor="bg-[#00081D]" padding="p-12">
      <div className="text-white">
        <section className="relative">
          <div className="bg-netflix-home md:h-[36rem] w-full opacity-40 rounded-lg"></div>
          <div className="absolute top-0 left-0 z-10 w-full mt-28 ml-12 space-y-4">
            <h1 className="font-bold text-4xl">
              Unlimited movies,
              <br /> TV shows and more
            </h1>
            <p className="font-bold md:text-2xl text-xl">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="md:text-2xl text-xl text-bold">
              Ready to watch? Enter your email to create or restart your <br />{" "}
              membership.
            </p>

            <form className="flex space-x-4">
              <div className="relative z-0 w-96 mb-6 group bg-[#1C0F17] border-2 rounded text-sm">
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
          </div>
        </section>

        <section className="mx-28">
          <FeatureCard
            featureHeading="Enjoy on your TV."
            featureImage={show1}
            aboutFeature="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players and more."
          ></FeatureCard>

          <FeatureCard
            featureHeading="Watch everywhere."
            featureImage={show2}
            aboutFeature="Stream unlimited movies and TV shows on your phone, tablet,
                laptop, and TV."
          ></FeatureCard>

          <FeatureCard
            featureHeading="Create profiles for children."
            featureImage={show3}
            aboutFeature="Send children on adventures with their favourite characters in a
                space made just for them—free with your membership."
          ></FeatureCard>

          <FeatureCard
            featureHeading="Download your shows to watch offline."
            featureImage={show4}
            aboutFeature="Save your favourites easily and always have something to watch."
          ></FeatureCard>
        </section>

        <section className="mx-28 space-y-4">
          <h2 className="font-bold">Frequently Asked Questions</h2>
          <Accordian></Accordian>
          <p className="text-2xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form className="flex space-x-4">
            <div className="relative z-0 w-96 mb-6 group bg-[#1C0F17] border-2 rounded text-sm">
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
                className="peer-focus:font-medium absolute text-xl px-4 pb-2 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
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

const StartIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="inline w-6 h-6 font-extrabold"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </>
  );
};
