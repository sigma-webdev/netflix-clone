import { GlobeIcon } from "../icons";

const Footer = () => {
  return (
    <footer className="p-10 md:p-28 space-y-10 text-slate-400 bg-netflix-blue ">
      <ul className="grid grid-rows-16 grid-cols-1 grid-flow-row sm:grid-rows-8 sm:grid-cols-2 sm:grid-flow-row md:grid-rows-4 md:grid-cols-4 md:grid-flow-col underline gap-y-4 mx-auto max-w-[80vw]">
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
        <div className="flex items-center h-fit w-fit bg-black text-white border-2 border-white rounded px-3 py-1 ">
          <GlobeIcon />
          <select className="bg-transparent rounded  " defaultValue={"English"}>
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
