import { Link } from "react-router-dom";
import show1 from ".././assets/images/show1.png";
import show2 from ".././assets/images/show2.png";
import show3 from ".././assets/images/show3.png";
import show4 from ".././assets/images/show4.png";
import Accordian from ".././components/accordian/Accordian";
import Layout from "../components/layout/Layout";

const Home = () => {
  return (
    <Layout bgcolor="bg-[#00081D]" padding="p-12">
      <div className="text-white ">
        <section className="relative">
          <div className="bg-netflix-home md:h-[36rem] md:w-full opacity-40 rounded-lg"></div>
          <div className="absolute top-0 left-0 z-10 w-full mt-28 ml-12 space-y-4">
            <h1 className="font-bold">
              Unlimited movies,
              <br /> TV shows and more
            </h1>
            <p className="font-bold text-2xl">
              Watch anywhere. Cancel anytime.
            </p>
            <p className="text-2xl text-bold">
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
          <article className="flex justify-center items-center gap-x-5">
            <div className="basis-1/2">
              <img src={show1} alt="banner" className="w-full" />
            </div>
            <div className="space-y-8 basis-1/2">
              <h2 className="text-5xl font-bold">Enjoy on your TV.</h2>
              <p className="text-2xl">
                Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                Blu-ray players and more.
              </p>
            </div>
          </article>

          <article className="flex justify-center items-center gap-x-5">
            <div className="space-y-8 basis-1/2">
              <h2 className="text-5xl font-bold">Watch everywhere.</h2>
              <p className="text-2xl">
                Stream unlimited movies and TV shows on your phone, tablet,
                laptop, and TV.
              </p>
            </div>
            <div>
              <img src={show2} alt="banner" className="w-full" />
            </div>
          </article>

          <article className="flex justify-center items-center gap-x-5">
            <div>
              <img src={show3} alt="banner" className="w-[500px]" />
            </div>
            <div className="space-y-8 basis-1/2">
              <h2 className="text-5xl font-bold">
                Create profiles for <br />
                children.
              </h2>
              <p className="text-2xl">
                Send children on adventures with their favourite characters in a
                space made just for them—free with your membership.
              </p>
            </div>
          </article>

          <article className="flex justify-center items-center gap-x-5">
            <div className="space-y-4 basis-1/2">
              <h2 className="text-5xl font-bold">
                Download your shows to watch offline.
              </h2>
              <p className="text-2xl">
                Save your favourites easily and always have something to watch.
              </p>
            </div>
            <div>
              <img src={show4} alt="banner" className="w-full" />
            </div>
          </article>
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
