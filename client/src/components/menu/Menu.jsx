import { BiDownArrow } from "react-icons/bi";

const Menu = ({ children }) => {
  return (
    <div>
      <div className="cursor-pointer">
        <BiDownArrow />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Menu;
