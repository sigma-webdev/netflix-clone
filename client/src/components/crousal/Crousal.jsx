import { useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import PreviewCard from "../../components/card/PreviewCard";
import { IconContext } from "react-icons/lib";

const Crousal = ({ content }) => {
  const ref = useRef(null);

  const handleLeftArrow = () => {
    ref.current.scrollLeft -= ref.current.offsetWidth;
    console.log(ref.current.scrollLeft);
  };

  const handleRightArrow = () => {
    ref.current.scrollLeft += ref.current.offsetWidth;
  };

  return (
    <div
      ref={ref}
      className="flex flex-start items-center gap-4 overflow-hidden scroll-smooth"
    >
      <div
        className="absolute left-0 z-10 hidden md:block cursor-pointer px-2 p-8 transition opacity-10 hover:opacity-50 "
        onClick={handleLeftArrow}
      >
        <IconContext.Provider value={{ size: "30px", color: "#ffffff" }}>
          <SlArrowLeft />
        </IconContext.Provider>
      </div>
      {content &&
        content.map((item) => {
          return (
            <PreviewCard key={item.id} contentPoster={item.contentPoster} />
          );
        })}
      <div
        className="absolute right-0 z-10 hidden md:block cursor-pointer px-2 p-8 transition opacity-10 hover:opacity-50"
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
