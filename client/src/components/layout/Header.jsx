import netflixLogo from "./../../assets/netflix_logo.png";

const Header = () => {
  return (
    <header>
      <img src={netflixLogo} alt="netflix logo" className="w-36" />
    </header>
  );
};

export default Header;
