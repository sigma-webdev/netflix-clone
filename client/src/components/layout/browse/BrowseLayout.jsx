import BrowseHeader from "./BrowseHeader";
import BrowseFooter from "./BrowseFooter";

const BrowseLayout = ({ children }) => {
  return (
    <>
      <BrowseHeader />
      <main>{children}</main>
      <BrowseFooter />
    </>
  );
};

export default BrowseLayout;
