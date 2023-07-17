import BrowseHeader from "./BrowseHeader";
import BrowseFooter from "./BrowseFooter";

const BrowseLayout = ({ children }) => {
  return (
    <div className="relative">
      <BrowseHeader />
      <main>{children}</main>
      <BrowseFooter />
    </div>
  );
};

export default BrowseLayout;
