import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

const HomeLayout = ({ children }) => {
  return (
    <div className="relative">
      <HomeHeader />
      <main>{children}</main>
      <HomeFooter />
    </div>
  );
};

export default HomeLayout;
