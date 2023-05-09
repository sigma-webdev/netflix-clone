import { Link } from "react-router-dom";
import show1 from ".././assets/images/show1.png";
import show2 from ".././assets/images/show2.png";
import show3 from ".././assets/images/show3.png";
import show4 from ".././assets/images/show4.png";
import Accordian from ".././components/accordian/Accordian";
import Layout from "../components/layout/Layout";
import FeatureCard from "../components/card/FeatureCard";
import AccordianItem from "../components/accordian/AccordianItem";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How much does Netflix cost?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.  You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
  },
  {
    id: 2,
    question: "Where can I watch?",
    answer:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.",
  },
  {
    id: 3,
    question: "What can I watch on Netflix?",
    answer:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
  },
  {
    id: 4,
    question: "How do I cancel?",
    answer:
      "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
  },
  {
    id: 5,
    question: "Is Netflix good for kids?",
    answer:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
  },
];

const features = [
  {
    featureHeading: "Enjoy on your TV.",
    featureImage: show1,
    aboutFeature:
      "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
  },
  {
    featureHeading: "Watch everywhere.",
    featureImage: show2,
    aboutFeature:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
  },
  {
    featureHeading: "Create profiles for children.",
    featureImage: show3,
    aboutFeature:
      "Send children on adventures with their favourite characters in a space made just for them—free with your membership.",
  },
  {
    featureHeading: "Download your shows to watch offline.",
    featureImage: show4,
    aboutFeature:
      "Save your favourites easily and always have something to watch.",
  },
];

const Home = () => {
  const [activeItem, setActiveItem] = useState(-1);

  const accordianHandler = (id) => {
    setActiveItem(id);
  };

  return (
    <Layout bgcolor="bg-[#00081D]" padding="p-4 sm:p-8 md:p-12">
      <div className="text-white">
        <section className="relative">
          <div className="bg-netflix-home h-[36rem] w-full opacity-40 rounded-lg"></div>
          <div className="absolute top-0 left-0 z-10 w-auto mx-4 md:mx-8 lg:mx-12 my-8 md:my-12 lg:my-24 space-y-4">
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

            <form className="flex flex-wrap md:space-x-4">
              <div className="relative z-0 max-w-80 md:w-96 mb-6 group bg-[#1C0F17] border-2 rounded text-sm">
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

        <section className="mx-8 md:mx-8 lg:mx-14">
          {features &&
            features.map((item, index) => {
              return (
                <FeatureCard
                  featureHeading={item.featureHeading}
                  featureImage={item.featureImage}
                  aboutFeature={item.aboutFeature}
                  currentIndex={index}
                ></FeatureCard>
              );
            })}
        </section>

        <section className="mx-2 sm:mx-14 md:mx-28 md:space-y-4">
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
