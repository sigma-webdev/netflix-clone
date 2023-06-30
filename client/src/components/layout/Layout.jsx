import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, isLogin, setCategory }) => {
  return (
    <div className="relative">
      <Header isLogin={isLogin}></Header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
