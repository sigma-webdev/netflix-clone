import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, isLogin }) => {
  return (
    <div>
      <Header isLogin={isLogin}></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
