import { useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import PreviewCard from "../../components/card/PreviewCard";
import { IconContext } from "react-icons/lib";

const Crousal = ({ children }) => {
  const ref = useRef(null);

  const handleLeftArrow = () => {
    ref.current.scrollLeft -= ref.current.offsetWidth;
  };

  const handleRightArrow = () => {
    ref.current.scrollLeft += ref.current.offsetWidth;
  };

  return (
    <div
      ref={ref}
      className="flex-start flex items-center gap-4 overflow-hidden scroll-smooth"
    >
      <div
        className="absolute left-0 z-20 hidden cursor-pointer p-8 px-2 opacity-10 transition hover:opacity-50 md:block "
        onClick={handleLeftArrow}
      >
        <IconContext.Provider value={{ size: "30px", color: "#ffffff" }}>
          <SlArrowLeft />
        </IconContext.Provider>
      </div>

      {/* main content */}
      {children}

      <div
        className="absolute right-0 z-20 hidden cursor-pointer p-8 px-2 opacity-10 transition hover:opacity-50 md:block"
        onClick={handleRightArrow}
      >
        <IconContext.Provider value={{ size: "30px", color: "#ffffff" }}>
          <SlArrowRight />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Crousal;
