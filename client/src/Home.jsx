import netflixLogo from "./assets/netflix_logo.png";
import show1 from "./assets/images/show1.png";
import show2 from "./assets/images/show2.png";
import show3 from "./assets/images/show3.png";
import show4 from "./assets/images/show4.png";
import Accordian from "./components/accordian/accordian";

const Home = () => {
  return (
    <div className="p-12 bg-[#00081D] text-white">
      <header>
        <img src={netflixLogo} alt="netflix logo" className="w-36" />
      </header>

      <section className="bg-netflix-home bg-no-repeat bg-cover rounded-md p-24 space-y-4">
        <h1 className="font-bold">
          Unlimited movies,
          <br /> TV shows and more
        </h1>
        <p className="font-bold text-2xl">Watch anywhere. Cancel anytime.</p>
        <p className="text-2xl">
          Ready to watch? Enter your email to create or restart your <br />{" "}
          membership.
        </p>
        <form>
          <input type="email" className="max-w-24 p-4 border-2 rounded" />
          <button type="submit" className="p-4 bg-red-600 rounded text-white">
            Get Started
          </button>
        </form>
      </section>

      <section>
        <article className="flow-root">
          <div className="float-right">
            <img src={show1} alt="banner" />
          </div>
          <div>
            <h2>Enjoy on your TV.</h2>
            <p>
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </div>
        </article>

        <article className="flow-root">
          <div className="float-left">
            <img src={show2} alt="banner" />
          </div>
          <div>
            <h2>Enjoy on your TV.</h2>
            <p>
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </div>
        </article>

        <article className="flow-root">
          <div className="float-right">
            <img src={show3} alt="banner" />
          </div>
          <div>
            <h2>Enjoy on your TV.</h2>
            <p>
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </div>
        </article>

        <article className="flow-root">
          <div className="float-left">
            <img src={show4} alt="banner" />
          </div>
          <div>
            <h2>Enjoy on your TV.</h2>
            <p>
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </div>
        </article>
      </section>

      <section>
        <Accordian></Accordian>
        <p className="text-xl">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form>
          <input type="email" className="p-4 border-2 rounded" />
          <button type="submit" className="p-4 bg-red-600 rounded text-white">
            Get Started
          </button>
        </form>
      </section>

      <footer>
        <ul className="grid grid-rows-4 grid-cols-4 grid-flow-col underline">
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">Investor Relations</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>
            <a href="#">Speed Test</a>
          </li>
          <li>
            <a href="#">Help Centre</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Cookie Preferences</a>
          </li>
          <li>
            <a href="#">Legal Notices</a>
          </li>
          <li>
            <a href="#">Account</a>
          </li>
          <li>
            <a href="#">Ways to Watch</a>
          </li>
          <li>
            <a href="#">Corporate Information</a>
          </li>
          <li>
            <a href="#">Only on Netflix</a>
          </li>
          <li>
            <a href="#">Media Centre</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Home;
