import { useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

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
      {/* left arrow */}
      <button
        className="absolute left-0 z-20 hidden cursor-pointer p-8 px-2 opacity-20 transition hover:opacity-80 md:block "
        onClick={handleLeftArrow}
      >
        <SlArrowLeft className="text-4xl text-white" />
      </button>

      {/* main content */}
      {children}

      {/* right arrow */}
      <button
        className="absolute right-0 z-20 hidden cursor-pointer p-8 px-2 opacity-20 transition hover:opacity-80 md:block"
        onClick={handleRightArrow}
      >
        <SlArrowRight className="text-4xl text-white" />
      </button>
    </div>
  );
};

export default Crousal;
