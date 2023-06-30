import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";

const Menu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:text-md relative text-sm" onClick={handleMenu}>
      <div className="cursor-pointer">
        <BiDownArrow />
      </div>
      {isOpen && <div className="absolute right-2 top-10 w-56">{children}</div>}
    </div>
  );
};

export default Menu;
