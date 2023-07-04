import { GlobeIcon } from "../icons";

const Footer = () => {
  return (
    <footer className="h-screen space-y-10 bg-netflix-blue p-10 text-slate-400 md:p-28">
      <ul className="grid-rows-16 sm:grid-rows-8 mx-auto grid max-w-[80vw] grid-flow-row grid-cols-1 gap-y-4 underline sm:grid-flow-row sm:grid-cols-2 md:grid-flow-col md:grid-cols-4 md:grid-rows-4">
        <li>
          <a href="/">FAQ</a>
        </li>
        <li>
          <a href="/">Investor Relations</a>
        </li>
        <li>
          <a href="/">Privacy</a>
        </li>
        <li>
          <a href="/">Speed Test</a>
        </li>
        <li>
          <a href="/">Help Centre</a>
        </li>
        <li>
          <a href="/">Jobs</a>
        </li>
        <li>
          <a href="/">Cookie Preferences</a>
        </li>
        <li>
          <a href="/">Legal Notices</a>
        </li>
        <li>
          <a href="/">Account</a>
        </li>
        <li>
          <a href="/">Ways to Watch</a>
        </li>
        <li>
          <a href="/">Corporate Information</a>
        </li>
        <li>
          <a href="/">Only on Netflix</a>
        </li>
        <li>
          <a href="/">Media Centre</a>
        </li>
        <li>
          <a href="/">Terms of Use</a>
        </li>
        <li>
          <a href="/">Contact Us</a>
        </li>
      </ul>
      <div className="mx-auto max-w-[80vw]">
        <div className="flex h-fit w-fit items-center rounded border-2 border-white bg-black px-3 py-1 text-white ">
          <GlobeIcon />
          <select className="rounded bg-transparent  " defaultValue={"English"}>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        <p className="mt-4">Netflix India</p>
      </div>
    </footer>
  );
};

export default Footer;
