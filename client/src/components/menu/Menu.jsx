import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";

const Menu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative text-sm md:text-md" onClick={handleMenu}>
      <div className="cursor-pointer">
        <BiDownArrow />
      </div>
      {isOpen && <div className="absolute top-10 w-56 right-2">{children}</div>}
    </div>
  );
};

export default Menu;
