import { GlobeIcon } from "../icons";

const Footer = () => {
  return (
    <footer className="p-28 space-y-10 text-slate-400 bg-netflix-blue">
      <ul className="grid grid-rows-4 grid-cols-4 grid-flow-col underline gap-y-4">
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
      <div className="flex items-center h-fit w-fit bg-black text-white border-2 border-white rounded px-3 py-1">
        <GlobeIcon />
        <select className="bg-transparent rounded  " defaultValue={"English"}>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
      <p>Netflix India</p>
    </footer>
  );
};

export default Footer;
