import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, bgcolor, padding }) => {
  return (
    <div className={`${bgcolor} ${padding}`}>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
